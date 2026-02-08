import { SchduledPost, Status } from '@/store/postStore';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const PostTile = ({post}: {post: SchduledPost}) => {

  const getStatusColor = (status: Status) => {
    switch(status) {
      case Status.SCHEDULED:
        return '#fbbf24'; 
      case Status.PUBLISHED:
        return '#10b981';
      case Status.FAILED:
        return '#ef4444'; 
      case Status.DRAFT:
        return '#6b7280'; 
      default:
        return '#3b82f6'; 
    }
  };

  const getStatusText = (status: Status) => {
    const statusString = status.toString();
    return statusString.charAt(0).toUpperCase() + statusString.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container} >
      <View style={styles.image_container}>
        <ImageBackground 
          source={{
            uri: post.media_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2hJ93ufC0h_NA8aKVWRlLXP0DVrFhFwXGNHr2wetipDINAM5S-fIaF_GM-TN_OBlOEtcZ2XWbDoLl7wbWnST76DM5JodKI2YmZj_j2Ba_0U8r-mwJ1WUlt5JyY2_IHdqfJrpi83ufqV2MJymSkTCSO0VC-f6-iTAd1I7BgbL6zCRhntbjBNV4Euawby_5joxdsAStQyUkqdmThb_-zQdcdbS8QaTmVGiehTXVKyVkzVp8DB71ep4VsLQr5RWE2qgfgqCaZ7k3t7rO',
          }}
          style={styles.image_style}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>

        <Text style={styles.title}>
          {post.content?.slice(0, Math.min(15, post.content.length)) + '...' || 'Untitled Post'}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(post.scheduled_time).toLocaleDateString()}
        </Text>
        <FontAwesome name={post.social_account_provider} size={20} color={"#34D399"}/>
      </View>
      
      <View style={styles.status}>
        <View style={{...(styles.statusDot), backgroundColor: getStatusColor(post.status) }} />
        <Text style={styles.statusText}>{getStatusText(post.status)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100, 
    backgroundColor: '#192730', 
    borderRadius: 20,
    borderWidth: 1, 
    borderColor: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
    marginBottom: 10, 
  },
  image_container: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 10, 
  },
  image_style: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    color: '#9ca3af',
    fontSize: 12,
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    color: '#e5e7eb',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default PostTile