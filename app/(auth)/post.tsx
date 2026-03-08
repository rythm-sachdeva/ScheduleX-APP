import { DateComponent } from '@/components/generic/DateComponent';
import { ScheduleStatus } from '@/global/constants/ScheduleConsts';
import { useAccountConfigStore } from '@/store/accountStore';
import { useAuthStore } from '@/store/authStore';
import { useDateStore } from '@/store/dateStore';
import { useUrlStore } from '@/store/urlStore';
import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


const Post = () => {
  const {linkedAccounts} = useAccountConfigStore();
  const [caption, setCaption] = React.useState('');
  const {backendUrl} = useUrlStore()
  const {getAccessToken,session} = useAuthStore();
  const {openDatePicker,setOpenDatePicker,date}= useDateStore();

  const handleClick = async () =>{
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(backendUrl + 'linkedin/post/',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken ?? session}`
        },
        body: JSON.stringify({ content: caption
        , scheduled_time: date ? date.toISOString() : new Date().toISOString(),
        provider:'linkedin',
        status:ScheduleStatus.SCHEDULED 
        })
      });
      if(response.ok){
        Toast.show({
          type:'success',
          text1:"Post Scheduled Successfully"
        })
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type:'error',
        text1:"Error While Posting"
      })
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardScrollContent}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>Create Post</Text>
          </View>

          {/* Upload Box */}
          <View style={styles.uploadBox}>
            <Feather name="upload" size={30} color="#4A90E2" style={styles.uploadIcon} />
            <Text style={styles.uploadTitle}>Tap to add Photos Or Videos</Text>
            <Text style={styles.uploadSubtitle}>Upload media for your posts</Text>
          </View>

          {/* Caption Header Row */}
          <View style={styles.captionHeader}>
            <Text style={styles.captionLabel}>Caption</Text>
            <Text style={styles.captionCounter}>0/2200</Text>
          </View>

          {/* Caption Input */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Write Caption'
              placeholderTextColor='#94a3b8'
              value={caption}
              onChangeText={setCaption}
              multiline={true}
              textAlignVertical='top'
            />
          </View>

          {/* Connected Accounts */}
          <View style={styles.accountsContainer}>
            <Text style={styles.accountsTitle}>Connected Accounts</Text>
            <FlatList
              data={linkedAccounts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.accountsList}
              renderItem={({ item: account }) => (
                <TouchableOpacity
                  style={styles.accountItem}
                  onPress={() => {}}
                >
                  {/* @ts-ignore */}
                  <FontAwesome name={account.provider} size={20} color={"#34D399"} />
                  <Text style={styles.accountName}>
                    {account.provider.charAt(0).toUpperCase() + account.provider.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <DateComponent />
          {/* Schedule Button */}
          <TouchableOpacity style={styles.scheduleButton} onPress={handleClick}>
            <Text style={styles.scheduleButtonText}>Schedule Post</Text>
          </TouchableOpacity>

        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Layout
  safeArea: {
    flex: 1,
    paddingTop: 36,       
    gap: 8,               
    padding: 16,          
    backgroundColor: '#101c22', 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  keyboardScrollContent: {
    flexGrow: 1,
  },

  // Title
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 30,         
    marginBottom: 24,     
    fontWeight: '600',    
  },

  // Upload Box
  uploadBox: {
    padding: 50,
    height: '30%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    marginBottom: 12,     
  },
  uploadTitle: {
    color: '#ffffff',
    fontSize: 18,         
    fontWeight: '600',    
  },
  uploadSubtitle: {
    color: '#475569',     
    fontSize: 14,         
  },

  // Caption row
  captionHeader: {
    flexDirection: 'row', 
    marginTop: 12,        
    marginBottom: -16,    
    justifyContent: 'space-between',
  },
  captionLabel: {
    color: '#ffffff',
    fontSize: 18,         
    marginBottom: 8,      
  },
  captionCounter: {
    color: '#ffffff',
    fontSize: 18,         
    marginBottom: 8,      
  },

  // TextInput container
  textInputContainer: {
    marginTop: 20,        
    flex: 1,
    borderRadius: 8,      
    borderWidth: 1,
    borderColor: '#325567',   
    backgroundColor: '#192b33', 
    minHeight: 80,        
    padding: 15,          
  },
  textInput: {
    color: '#ffffff',
    fontSize: 20,         
    minHeight: 400,       
  },

  // Connected Accounts
  accountsContainer: {
    marginTop: 20,        
    gap: 4,               
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,          
    borderRadius: 12,     
  },
  accountsTitle: {
    color: '#E0E0E0',     
    fontSize: 18,         
    fontWeight: '600',    
    marginBottom: 8,      
  },
  accountsList: {
    paddingRight: 0,
  },
  accountItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: 16,              
    alignItems: 'center',
    width: 120,           
    marginRight: 16,      
    padding: 16,          
    backgroundColor: '#1e293b', 
    borderRadius: 8,      
  },
  accountName: {
    color: '#ffffff',
    fontWeight: '600',    
    fontSize: 18,         
  },
  scheduleButton: {
    backgroundColor: '#4A90E2', 
    borderRadius: 9999,   
    padding: 16,          
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,   
  },
  scheduleButtonText: {
    color: '#ffffff',
    fontSize: 18,         
    fontWeight: '600',   
  },
});

export default Post;