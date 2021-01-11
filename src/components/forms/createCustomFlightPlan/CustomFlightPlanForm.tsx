import React, { useState } from 'react';
import { FlatList, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import FlightPlanValidationSchema from './CustomFlightPlanFormValidation';
import { styles, formStyles } from '../../../styles/Styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NodeFormContainer from './NodeFormContainer';
import { FlightPlan, Node } from '../../../models/FlightPlan';
import { v4 as uuidv4 } from 'uuid';
import * as flightPlanStore from '../../../stores/flightPlansStore';
import { StackActions } from '@react-navigation/native';

export interface Props {
  flightPlan: FlightPlan | null | undefined,
  navigation: any
}

export const CustomFlightPlanForm = (props: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNodeModalVisible, setNodeModalVisiblity] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleAddNode = () => {
    console.log("Adding node, opening modal");
  };

  const nodes: Node[] = !!props.flightPlan ? props.flightPlan.nodes : [];
  let initialValues = {
    name: !!props.flightPlan ? props.flightPlan.name : '',
    date: !!props.flightPlan ? props.flightPlan.date : new Date(),
    description: !!props.flightPlan ? props.flightPlan.description : '',
    nodes: nodes
  }
  
  const renderItemButton = ({ item }: { item: Node }) => {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacity} onPress={() => {
        console.log(item);
        setSelectedNode(item);
        setNodeModalVisiblity(true);
      }}>
        <Text>{item.ident} {item.name !== null && item.name !== undefined ? `- ${item.name}` : ''} @ {item.altitude} ft</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FlightPlanValidationSchema}
      onSubmit={async (values) => {
        if(!!props.flightPlan) {
          props.flightPlan.name = values.name;
          props.flightPlan.description = values.description;
          props.flightPlan.date = values.date;
          props.flightPlan.nodes = values.nodes;
          await flightPlanStore.updateFlightPlan(props.flightPlan)
        } else {
          await flightPlanStore.addFlightPlan(new FlightPlan(values.name, values.date, values.description, values.nodes));
        }
        const popAction = StackActions.pop(1);
        props.navigation.dispatch(popAction);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <View style={formStyles.formContainer}>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            style={formStyles.inputText}
            placeholder='Flight plan name'
            maxLength={100}
          />
          <TextInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            style={{ ...formStyles.inputText, textAlignVertical: 'top' }}
            placeholder='Description (optional)'
            maxLength={1000}
            multiline={true}
            numberOfLines={4}
          />
          <Text style={formStyles.formDateText} onPress={() => setDatePickerVisibility(true)}>{values.date.toString()}</Text>
          <DateTimePickerModal
            mode='datetime'
            date={new Date(values.date)}
            isVisible={isDatePickerVisible}
            onConfirm={(date) => {
              setFieldValue('date', date);
              setDatePickerVisibility(false);
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={() => setNodeModalVisiblity(true)}>
            <Text style={formStyles.formButtonText}>Add steerpoint</Text>
          </TouchableOpacity>
          <NodeFormContainer
            selectedNode={selectedNode}
            isVisible={isNodeModalVisible}
            onConfirm={(selectedNode: Node | null, node: Node) => {
              let index = -1;
              if(selectedNode !== null) {
                index = values.nodes.findIndex((element) => element.id === selectedNode?.id);
              }
              
              if(index === -1) {
                values.nodes.push(node);
              } else {
                values.nodes[index] = node;
              }
              setSelectedNode(null);
              setNodeModalVisiblity(false);
            }}
            onCancel={() => {
              setSelectedNode(null);
              setNodeModalVisiblity(false)
            }}
          />

          <FlatList
            data={values.nodes}
            renderItem={renderItemButton}
            keyExtractor={(item: Node) => item.id}
          />

          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={handleSubmit}>
            <Text style={formStyles.formButtonText}>Create flight plan</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}