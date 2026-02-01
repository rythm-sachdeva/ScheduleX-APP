import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const GetStartedCard = () => {
  const handleLinkAccount = () => {
    console.log('Link account pressed');
    // Add your navigation or linking logic here
  };

  return (
    <View style={styles.container} >
      <View style={styles.card} className='border-gray-700'>
        {/* Header Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2hJ93ufC0h_NA8aKVWRlLXP0DVrFhFwXGNHr2wetipDINAM5S-fIaF_GM-TN_OBlOEtcZ2XWbDoLl7wbWnST76DM5JodKI2YmZj_j2Ba_0U8r-mwJ1WUlt5JyY2_IHdqfJrpi83ufqV2MJymSkTCSO0VC-f6-iTAd1I7BgbL6zCRhntbjBNV4Euawby_5joxdsAStQyUkqdmThb_-zQdcdbS8QaTmVGiehTXVKyVkzVp8DB71ep4VsLQr5RWE2qgfgqCaZ7k3t7rO',
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', 'rgba(17, 24, 39, 0.9)']}
              style={styles.gradient}
            >
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Recommended</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Let's get you set up</Text>
            <Text style={styles.description} className='text-white/70'>
              Connect your first social account to start automating your
              workflow today.
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLinkAccount}
            activeOpacity={0.9}
          >
            <AntDesign name="link" size={24} style={styles.buttonIcon} color="#ffffff" />
            <Text style={styles.buttonText}>Link Your First Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#192b33',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 160,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  badgeContainer: {
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  badgeText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -0.27,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 16,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GetStartedCard;