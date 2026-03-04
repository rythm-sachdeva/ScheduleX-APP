import { ConnectButton } from '@/components/Crypto/ConnectedButton';
import Tile from '@/components/HomePage/Tile';
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts';
import { useWallet } from '@/hooks/useWallet';
import { useUserStore } from '@/store/userStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
   const { userDetails } = useUserStore();
   
   const wallet = useWallet();
   return (
      <SafeAreaView className='min-h-screen pt-8 flex gap-8 bg-background-dark'>
         {/* Main Content */}
         <View className='flex gap-5 items-center'>

            {/* profile pic */}
            <View className='relative'>
                <LinearGradient
               colors={['#667EEA', '#764BA2', '#F093FB']}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={{
                  height: 85,
                  width: 85,
                  borderRadius: 100,
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position:'relative',
                  
               }}
            >
               <View className='border-2 flex items-center justify-center border-background-dark absolute h-6 w-6 bg-primary bottom-2 right-1 z-10 rounded-full'>
                 <FontAwesome name="pencil" size={8} color="white" />
               </View>
               {/* Inner container with your image */}
               <View style={{
                  height: 79,
                  width: 79,
                  borderRadius: 100,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
               }}>
                  <Image source={{
                     uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2hJ93ufC0h_NA8aKVWRlLXP0DVrFhFwXGNHr2wetipDINAM5S-fIaF_GM-TN_OBlOEtcZ2XWbDoLl7wbWnST76DM5JodKI2YmZj_j2Ba_0U8r-mwJ1WUlt5JyY2_IHdqfJrpi83ufqV2MJymSkTCSO0VC-f6-iTAd1I7BgbL6zCRhntbjBNV4Euawby_5joxdsAStQyUkqdmThb_-zQdcdbS8QaTmVGiehTXVKyVkzVp8DB71ep4VsLQr5RWE2qgfgqCaZ7k3t7rO',
                  }} style={{ width: '100%', height: '100%' }} />
               </View>
            </LinearGradient>
            </View>

         <View className='flex items-center'>
               <Text className='text-white font-semibold text-xl'>
                  {
                     userDetails && `${userDetails.username}`
                  }
               </Text>
               <Text className='text-primary'>
                  {
                     userDetails && `${userDetails.username} • ${userDetails.email}`
                  }
               </Text>
            </View>
         <View className=''>

         <ConnectButton
          connected={wallet.connected}
          connecting={wallet.connecting!=null? wallet.connecting:false}
          publicKey={wallet.publicKey?.toBase58() ?? null}
          onConnect={wallet.connect}
          onDisconnect={wallet.disconnect}
        />         

         </View>

         </View>
         {/* Footer  */}
         {
            <View className='w-full border-bl rounde flex-1 p-2 gap-10 px-3 pt-6'>
               {AllowedAccounts.map((item: AccountInfo) => (<Tile key={item.socialAccount} icon={item.icon} socialAccount={item.socialAccount} />))}
            </View>
         }
      </SafeAreaView>
   )
}


export default Profile