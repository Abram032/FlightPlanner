import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { formStyles } from '../../../styles/Styles';

export const NodeFormContainer = ({ node, isVisible, onConfirm, onCancel }: 
  { node: any, isVisible: boolean, onConfirm: (node: any) => void, onCancel: () => void }) => {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View>
        <Text>Test modal</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#f00' }}
          onPress={() => {
            onConfirm(false);
          }}
        >
          <Text>Hide modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NodeFormContainer;