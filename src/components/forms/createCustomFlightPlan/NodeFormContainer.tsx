import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles, formStyles } from '../../../styles/Styles';
import { NodeForm } from './NodeForm';
import { Node } from '../../../models/FlightPlan';

export const NodeFormContainer = ({ selectedNode, isVisible, onConfirm, onCancel }:
  { selectedNode: Node | null, isVisible: boolean, onConfirm: (selectedNode: Node | null, node: Node) => void, onCancel: () => void }) => {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.componentBody}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <NodeForm selectedNode={selectedNode} isVisible={isVisible} onConfirm={onConfirm} onCancel={onCancel} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NodeFormContainer;