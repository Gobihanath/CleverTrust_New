import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors"; // Assuming you have defined your colors somewhere
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const RequestClaim = () => {
  const navigation = useNavigation();
  const [claimType, setClaimType] = useState(""); // State to hold selected claim type
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    // Logic to handle claim submission, e.g., API calls, validation
    ToastAndroid.show("Claim Request Submitted", ToastAndroid.LONG);
    // You can navigate to another screen or show a success message
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top-Header View Customized  */}
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          height: 100,
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginLeft: 20,
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            gap: 40,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            Request a claim
          </Text>
        </View>
      </View>
      {/* Top-Header View Customized  */}

      {/* Claim Form */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        {/* Email/Username */}
        <TextInput
          placeholder="Your Name"
          placeholderTextColor={Colors.LIGHT}
          style={styles.input}
        />

        {/* Claim Description */}
        <TextInput
          placeholder="Claim Description"
          placeholderTextColor={Colors.LIGHT}
          style={[styles.input, { height: 120, textAlignVertical: "top" }]}
          multiline
          numberOfLines={4}
        />

        {/* Claim Type Selector */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={claimType}
            onValueChange={(itemValue, itemIndex) => setClaimType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Claim Type" value="" />
            <Picker.Item label="Personal" value="Personal" />
            <Picker.Item label="Vehicle" value="Vehicle" />
            <Picker.Item label="Third Party" value="Third Party" />
            <Picker.Item label="Damage" value="Damage" />
          </Picker>
        </View>

        {/* Date of Incident */}
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
            <Text>Select Incident Date: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

        {/* Amount */}
        <TextInput
          placeholder="Amount"
          placeholderTextColor={Colors.LIGHT}
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Upload Attachments */}
        <TextInput
          placeholder="Upload Attachments"
          placeholderTextColor={Colors.LIGHT}
          style={styles.input}
        />

        {/* Button to Submit */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Now</Text>
        </TouchableOpacity>
      </View>
      {/* End Claim Form */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "outfit-light",
    fontSize: 18,
    color: Colors.GREY,
    paddingLeft: 10,
    paddingVertical: 10,
    borderColor: Colors.PRIMARY,
    borderWidth: 1.2,
    borderRadius: 4,
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: Colors.PRIMARY,
    borderWidth: 1.2,
    borderRadius: 4,
    marginBottom: 20,
  },
  dateTimeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: Colors.PRIMARY,
    borderWidth: 1.2,
  },
  picker: {
    fontFamily: "outfit-light",
    fontSize: 18,
    color: Colors.LIGHT,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
});

export default RequestClaim;
