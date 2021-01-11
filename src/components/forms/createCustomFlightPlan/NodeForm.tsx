import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlightPlanValidationSchema, { NodeValidationSchema } from './CustomFlightPlanFormValidation';
import { formStyles } from '../../../styles/Styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch } from 'react-native-gesture-handler';
import { CoordinateType } from '../../../models/FlightPlan';
import { Node } from '../../../models/FlightPlan';
import { v4 as uuidv4 } from 'uuid';

export interface Props {
  selectedNode: Node | null,
  isVisible: boolean,
  onConfirm: (selectedNode: Node | null, node: Node) => void,
  onCancel: () => void
}

export const NodeForm = (props: Props) => {
  const [isTotDatePickerVisible, setTotDatePickerVisibility] = useState(false);
  const [isStartDtotDatePickerVisible, setStartDtotDatePickerVisibility] = useState(false);
  const [isEndDtotDatePickerVisible, setEndDtotDatePickerVisibility] = useState(false);
  const [isTotEnabled, setTotIsEnabled] = useState(props.selectedNode !== null && props.selectedNode.tot !== null);
  const [isDtotEnabled, setDtotIsEnabled] = useState(props.selectedNode !== null && props.selectedNode.dtot !== null);
  const [isViaEnabled, setViaIsEnabled] = useState(props.selectedNode !== null && props.selectedNode.via !== null)

  let initialValues = {
    name: props.selectedNode !== null ? props.selectedNode.name ?? '' : '',
    type:  props.selectedNode !== null ? props.selectedNode.type ?? '' : '',
    ident:  props.selectedNode !== null ? props.selectedNode.ident ?? '' : '',
    altitude:  props.selectedNode !== null ? props.selectedNode.altitude.toString() ?? '' : '',
    tot: props.selectedNode !== null ? props.selectedNode.tot ?? new Date() : new Date(),
    startDTOT: props.selectedNode !== null ? props.selectedNode.dtot?.start ?? new Date() : new Date(),
    endDTOT: props.selectedNode !== null ? props.selectedNode.dtot?.end ?? new Date() : new Date(),
    viaType: props.selectedNode !== null ? props.selectedNode.via?.type ?? '' : '',
    viaIdent: props.selectedNode !== null ? props.selectedNode.via?.ident ?? '' : '',
    description: props.selectedNode !== null ? props.selectedNode.description ?? '' : '',
    latitude: props.selectedNode !== null && props.selectedNode.coordinateType !== CoordinateType.MGRS ? props.selectedNode.coordinates[0].toString() ?? '' : '',
    longitude: props.selectedNode !== null && props.selectedNode.coordinateType !== CoordinateType.MGRS ? props.selectedNode.coordinates[1].toString() ?? '' : '',
    mgrs: props.selectedNode !== null && props.selectedNode.coordinateType === CoordinateType.MGRS ? props.selectedNode.coordinates[0].toString() ?? '' : '',
    coordinateType: props.selectedNode !== null ? props.selectedNode.coordinateType ?? CoordinateType.GPS : CoordinateType.GPS
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NodeValidationSchema}
      onSubmit={values => {
        props.onConfirm(props.selectedNode, {
          id: uuidv4(),
          type: values.type,
          name: values.name,
          ident: values.ident,
          description: values.description,
          coordinateType: values.coordinateType,
          coordinates: values.coordinateType === CoordinateType.MGRS ? [values.mgrs] : [values.latitude, values.longitude],
          altitude: parseInt(values.altitude),
          tot: isTotEnabled ? values.tot : null,
          dtot: isDtotEnabled ? {
            start: values.startDTOT,
            end: values.endDTOT
          } : null,
          via: isViaEnabled ? {
            type: values.viaType,
            ident: values.viaIdent
          } : null
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors, values }) => (
        <View style={formStyles.formContainer}>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            style={formStyles.inputText}
            placeholder='Steerpoint name'
            maxLength={100}
          />
          {touched.name && errors.name ? <Text style={formStyles.validationError}>{errors.name}</Text> : null}

          <TextInput
            onChangeText={handleChange('ident')}
            onBlur={handleBlur('ident')}
            value={values.ident}
            style={formStyles.inputText}
            placeholder='Steerpoint ID (ex. ICAO)'
            maxLength={10}
          />
          {touched.ident && errors.ident ? <Text style={formStyles.validationError}>{errors.ident}</Text> : null}

          <TextInput
            onChangeText={handleChange('type')}
            onBlur={handleBlur('type')}
            value={values.type}
            style={formStyles.inputText}
            placeholder='Steerpoint type'
            maxLength={10}
          />
          {touched.type && errors.type ? <Text style={formStyles.validationError}>{errors.type}</Text> : null}

          <TextInput
            onChangeText={handleChange('altitude')}
            onBlur={handleBlur('altitude')}
            value={values.altitude.toString()}
            style={formStyles.inputText}
            placeholder='Altitude (ft.)'
            maxLength={5}
            keyboardType='phone-pad'
          />
          {touched.altitude && errors.altitude ? <Text style={formStyles.validationError}>{errors.altitude}</Text> : null}

          <View style={formStyles.formHorizontalSelection}>
            <TouchableOpacity activeOpacity={0.8} style={formStyles.formHorizontalSelectionButton} onPress={() => setFieldValue('coordinateType', CoordinateType.GPS)}>
              <Text style={formStyles.formButtonText}>GPS</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={formStyles.formHorizontalSelectionButton} onPress={() => setFieldValue('coordinateType', CoordinateType.LATLON)}>
              <Text style={formStyles.formButtonText}>LAT/LON</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={formStyles.formHorizontalSelectionButton} onPress={() => setFieldValue('coordinateType', CoordinateType.MGRS)}>
              <Text style={formStyles.formButtonText}>MGRS</Text>
            </TouchableOpacity>
          </View>
          {
            values.coordinateType === CoordinateType.MGRS ?
              (<>
                <TextInput
                  onChangeText={handleChange('mgrs')}
                  onBlur={handleBlur('mgrs')}
                  value={values.mgrs}
                  style={formStyles.inputText}
                  placeholder='MGRS coordinate (ex. 34U DC 97758 79483)'
                  maxLength={18}
                />
                {touched.mgrs && errors.mgrs ? <Text style={formStyles.validationError}>{errors.mgrs}</Text> : null}
              </>) :
              (<>
                <TextInput
                  onChangeText={handleChange('latitude')}
                  onBlur={handleBlur('latitude')}
                  value={values.latitude}
                  style={formStyles.inputText}
                  placeholder={values.coordinateType === CoordinateType.GPS ? 'Latitude (ex. 52.1722653)' : 'Latitude (ex. 52°09\'57.00\" N)'}
                  keyboardType={values.coordinateType === CoordinateType.GPS ? 'phone-pad' : 'default'}
                  maxLength={14}
                />
                {touched.latitude && errors.latitude ? <Text style={formStyles.validationError}>{errors.latitude}</Text> : null}
                <TextInput
                  onChangeText={handleChange('longitude')}
                  onBlur={handleBlur('longitude')}
                  value={values.longitude}
                  style={formStyles.inputText}
                  placeholder={values.coordinateType === CoordinateType.GPS ? 'Longitude (ex. 20.9215658)' : 'Longitude (ex. 20°58\'02.00\" E)'}
                  keyboardType={values.coordinateType === CoordinateType.GPS ? 'phone-pad' : 'default'}
                  maxLength={14}
                />
                {touched.longitude && errors.longitude ? <Text style={formStyles.validationError}>{errors.longitude}</Text> : null}
              </>)
          }

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
          {touched.description && errors.description ? <Text style={formStyles.validationError}>{errors.description}</Text> : null}

          <View style={formStyles.formSwitchContainer}>
            <Text style={formStyles.formText}>Add TOT</Text>
            <Switch
              trackColor={{ false: '#008bda', true: '#eee' }}
              thumbColor={!isTotEnabled ? '#ddd' : '#fff'}
              style={{ alignSelf: 'flex-start' }}
              value={isTotEnabled}
              onValueChange={() =>  setTotIsEnabled(!isTotEnabled)}
            />
          </View>
          {isTotEnabled ? <Text style={formStyles.formDateText} onPress={() => setTotDatePickerVisibility(true)}>{values.tot.toString()}</Text> : <></>}
          <DateTimePickerModal
            mode='time'
            date={new Date(values.tot)}
            isVisible={isTotDatePickerVisible}
            onConfirm={(tot) => {
              setFieldValue('tot', tot.toTimeString());
              setTotDatePickerVisibility(false);
            }}
            onCancel={() => setTotDatePickerVisibility(false)}
          />
          {touched.tot && errors.tot ? <Text style={formStyles.validationError}>{errors.tot}</Text> : null}

          <View style={formStyles.formSwitchContainer}>
            <Text style={formStyles.formText}>Add DTOT</Text>
            <Switch
              trackColor={{ false: '#008bda', true: '#eee' }}
              thumbColor={!isDtotEnabled ? '#ddd' : '#fff'}
              style={{ alignSelf: 'flex-start' }}
              value={isDtotEnabled}
              onValueChange={() => setDtotIsEnabled(!isDtotEnabled)}
            />
          </View>
          {isDtotEnabled ? <Text style={formStyles.formDateText} onPress={() => setStartDtotDatePickerVisibility(true)}>{values.startDTOT.toString()}</Text> : <></>}
          {isDtotEnabled ? <Text style={formStyles.formDateText} onPress={() => setEndDtotDatePickerVisibility(true)}>{values.endDTOT.toString()}</Text> : <></>}
          <DateTimePickerModal
            mode='time'
            date={new Date(values.startDTOT)}
            isVisible={isStartDtotDatePickerVisible}
            onConfirm={(startDTOT) => {
              setFieldValue('startDTOT', startDTOT.toTimeString());
              setStartDtotDatePickerVisibility(false);
            }}
            onCancel={() => setStartDtotDatePickerVisibility(false)}
          />
          {touched.startDTOT && errors.startDTOT ? <Text style={formStyles.validationError}>{errors.startDTOT}</Text> : null}
          <DateTimePickerModal
            mode='time'
            date={new Date(values.endDTOT)}
            isVisible={isEndDtotDatePickerVisible}
            onConfirm={(endDTOT) => {
              setFieldValue('endDTOT', endDTOT.toTimeString());
              setEndDtotDatePickerVisibility(false);
            }}
            onCancel={() => setEndDtotDatePickerVisibility(false)}
          />
          {touched.endDTOT && errors.endDTOT ? <Text style={formStyles.validationError}>{errors.endDTOT}</Text> : null}

          <View style={formStyles.formSwitchContainer}>
            <Text style={formStyles.formText}>Add Via</Text>
            <Switch
              trackColor={{ false: '#008bda', true: '#eee' }}
              thumbColor={!isViaEnabled ? '#ddd' : '#fff'}
              style={{ alignSelf: 'flex-start' }}
              value={isViaEnabled}
              onValueChange={() => setViaIsEnabled(!isViaEnabled)}
            />
          </View>
          {
            isViaEnabled ?
              (
                <>
                  <TextInput
                    onChangeText={handleChange('viaType')}
                    onBlur={handleBlur('viaType')}
                    value={values.viaType}
                    style={formStyles.inputText}
                    placeholder='Via type'
                    maxLength={10}
                  />
                  {touched.viaType && errors.viaType ? <Text style={formStyles.validationError}>{errors.viaType}</Text> : null}
                </>
              ): <></>
          }
          {
            isViaEnabled ?
            (
              <>
                <TextInput
                  onChangeText={handleChange('viaIdent')}
                  onBlur={handleBlur('viaIdent')}
                  value={values.viaIdent}
                  style={formStyles.inputText}
                  placeholder='Via ID'
                  maxLength={10}
                />
                {touched.viaIdent && errors.viaIdent ? <Text style={formStyles.validationError}>{errors.viaIdent}</Text> : null}
              </>
            ): <></>
          }

          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={handleSubmit}>
            <Text style={formStyles.formButtonText}>{props.selectedNode !== null ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={formStyles.formButton} onPress={props.onCancel}>
            <Text style={formStyles.formButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};