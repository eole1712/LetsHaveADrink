import React from 'react';
import { View, Text } from 'react-native'

import styles from './styles'

export default () => (
  <View style={styles.noNetworkContainer}>
    <Text style={styles.noNetwork}>
      Please connect to the magical internet, it's fun
    </Text>
  </View>
)
