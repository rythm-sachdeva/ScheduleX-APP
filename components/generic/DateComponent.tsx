import { useDateStore } from '@/store/dateStore';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const DateComponent = () => {
  const { date, setDate, openDatePicker, setOpenDatePicker } = useDateStore();

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setOpenDatePicker(false);
    
    const utcString = selectedDate.toISOString(); 
    const localString = selectedDate.toLocaleString();
    const timestamp = selectedDate.getTime();
    
  };

  const displayDate = date 
    ? date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }) 
    : 'Select Date';

  const displayTime = date 
    ? date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }) 
    : '--:--';

  const displayDay = date
    ? date.toLocaleDateString('en-US', { day: 'numeric' })
    : '--';

  const displayMonth = date
    ? date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    : 'MONTH';

  const displayHour = date
    ? date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false })
    : '--';

  const displayMinute = date
    ? date.toLocaleTimeString('en-US', { minute: '2-digit' })
    : '--';

  const displayPeriod = date
    ? date.toLocaleTimeString('en-US', { hour12: true }).split(' ')[1]
    : 'AM';

  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Schedule Event</Text>
      </View>

      {/* Two Box Layout */}
      <View style={styles.boxContainer}>
        {/* DATE BOX */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenDatePicker(true)}
          style={styles.dateBox}
        >
          <View style={styles.iconContainer}>
       <FontAwesome5 name="calendar-alt" size={34} color="white" />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.boxLabel}>DATE</Text>
            <Text style={date ? styles.mainText : styles.placeholderText}>
              {displayDay}
            </Text>
            <Text style={date ? styles.subText : styles.placeholderSubText}>
              {displayMonth}
            </Text>
          </View>
        </TouchableOpacity>

        {/* TIME BOX */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenDatePicker(true)}
          style={styles.timeBox}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="time-sharp" size={35} color="white" />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.boxLabel}>TIME</Text>
            <View style={styles.timeDisplay}>
              <Text style={date ? styles.mainText : styles.placeholderText}>
                {date ? date.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                }) : '--:--'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Full Date Display */}
      {date && (
        <View style={styles.fullDateContainer}>
          <Text style={styles.fullDateText}>
            {date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} at {displayTime}
          </Text>
        </View>
      )}


      {/* Clear Button */}
      {date && (
        <TouchableOpacity
          onPress={() => setDate(null)}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear Date & Time</Text>
        </TouchableOpacity>
      )}

      {/* DateTime Picker Modal */}
      <DateTimePickerModal
        isVisible={openDatePicker}
        mode="datetime"
        date={date || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setOpenDatePicker(false)}
        buttonTextColorIOS="#6366f1"
        isDarkModeEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#101c22',
  },
  labelContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  dateBox: {
    flex: 1,
    backgroundColor: '#192b33',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#325567',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timeBox: {
    flex: 1,
    backgroundColor: '#192b33',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#325567',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#4A90E2',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 28,
  },
  contentContainer: {
    alignItems: 'center',
  },
  boxLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  mainText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 1,
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 32,
    fontWeight: 'bold',
  },
  placeholderSubText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 1,
  },
  timeDisplay: {
    alignItems: 'center',
  },
  fullDateContainer: {
    width: '100%',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#192730',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  fullDateText: {
    color: '#e2e8f0',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  debugContainer: {
    marginTop: 16,
    width: '100%',
  },
  debugCard: {
    padding: 12,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 8,
  },
  debugCardUTC: {
    padding: 12,
    backgroundColor: '#312e81',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4338ca',
    marginBottom: 8,
  },
  debugLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  debugLabelUTC: {
    color: '#a5b4fc',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  debugValue: {
    color: '#e2e8f0',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  debugValueUTC: {
    color: '#c7d2fe',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  clearButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(127, 29, 29, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#991b1b',
  },
  clearButtonText: {
    color: '#f87171',
    fontWeight: '600',
    fontSize: 14,
  },
});