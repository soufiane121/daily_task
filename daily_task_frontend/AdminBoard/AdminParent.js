import React from 'react';
import { View } from 'react-native';
import { useIsFocused} from '@react-navigation/native';
import Admin from './Admin'



const AdminParent = () => {
const isFocused = useIsFocused();

    return (
    <Admin isFocused={isFocused}/>
);
    }

export default AdminParent;
