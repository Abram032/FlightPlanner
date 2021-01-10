import React, { useState } from 'react';
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import FlightPlanValidationSchema from './CustomFlightPlanFormValidation';
import { formStyles } from '../../../styles/Styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NodeFormContainer from './NodeFormContainer';

export interface Props {

}

export const CustomFlightPlanForm = (props: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNodeModalVisible, setNodeModelVisibility] = useState(false);

  const handleAddNode = () => {
    console.log("Adding node, opening modal");
  };

  return (
    <Formik
      initialValues={{ name: '', date: new Date(), description: '', nodes: [] }}
      validationSchema={FlightPlanValidationSchema}
      onSubmit={values => console.log(values)}
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
          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={() => setNodeModelVisibility(true)}>
            <Text style={formStyles.formButtonText}>Add node</Text>
          </TouchableOpacity>
          <NodeFormContainer 
            node={values.nodes}
            isVisible={isNodeModalVisible}
            onConfirm={(node) => {
              console.log(node);
              setNodeModelVisibility(false);
            }}
            onCancel={() => setNodeModelVisibility(false)}
          />
          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={handleSubmit}>
            <Text style={formStyles.formButtonText}>Create flight plan</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}