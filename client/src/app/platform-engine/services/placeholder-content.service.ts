import { Injectable } from '@angular/core';
import { MediaItem, SectionConfig } from '../models';

const ITEMS_PER_SECTION = 8;

const MUSIC_ITEMS: Record<string, Array<{ title: string; artist: string }>> = {
  soundwave: [
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'As It Was', artist: 'Harry Styles' },
    { title: 'Flowers', artist: 'Miley Cyrus' },
    { title: 'Save Your Tears', artist: 'The Weeknd' },
    { title: 'Perfect', artist: 'Ed Sheeran' },
    { title: 'Bad Guy', artist: 'Billie Eilish' }
  ],
  tunespace: [
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'Billie Jean', artist: 'Michael Jackson' },
    { title: 'Rolling in the Deep', artist: 'Adele' },
    { title: 'Hotel California', artist: 'Eagles' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { title: 'Someone Like You', artist: 'Adele' },
    { title: 'Viva la Vida', artist: 'Coldplay' },
    { title: 'Havana', artist: 'Camila Cabello' }
  ]
};

const PLATFORM_ITEMS: Record<string, Array<{ title: string; subtitle: string }>> = {
  socialhub: [
    { title: 'Travel Reels', subtitle: 'Explore creators' }, { title: 'Street Photography', subtitle: '12.4K likes' },
    { title: 'Weekend Stories', subtitle: 'Friends and family' }, { title: 'Live Sessions', subtitle: 'Trending now' },
    { title: 'Food Discoveries', subtitle: 'Local guides' }, { title: 'Creator Spotlight', subtitle: 'New this week' },
    { title: 'Fashion Inspo', subtitle: 'Suggested for you' }, { title: 'Morning Moments', subtitle: 'Your feed' }
  ],
  connectly: [
    { title: 'Family Updates', subtitle: 'Recent posts' }, { title: 'College Friends', subtitle: 'Group highlights' },
    { title: 'Local Events', subtitle: 'Happening nearby' }, { title: 'Marketplace', subtitle: 'Popular listings' },
    { title: 'Community News', subtitle: 'Your neighborhood' }, { title: 'Photo Memories', subtitle: 'On this day' },
    { title: 'Recommended Groups', subtitle: 'Join the conversation' }, { title: 'Watch Together', subtitle: 'Videos for you' }
  ],
  pronetwork: [
    { title: 'MrBeast', subtitle: 'Creator channel' }, { title: 'TED', subtitle: 'Ideas worth spreading' },
    { title: 'Music Live', subtitle: 'Live performances' }, { title: 'Tech Reviews', subtitle: 'Top channels' },
    { title: 'Documentaries', subtitle: 'Watch next' }, { title: 'Learning Hub', subtitle: 'Recommended' },
    { title: 'Gaming Live', subtitle: 'Trending streams' }, { title: 'News Clips', subtitle: 'Latest uploads' }
  ],
  newsspace: [
    { title: 'World News', subtitle: 'Top stories' }, { title: 'Technology', subtitle: 'Latest updates' },
    { title: 'Business', subtitle: 'Market briefing' }, { title: 'Science', subtitle: 'New discoveries' },
    { title: 'Sports', subtitle: 'Live headlines' }, { title: 'Culture', subtitle: 'Editors picks' },
    { title: 'India News', subtitle: 'Around the country' }, { title: 'Climate', subtitle: 'The big picture' }
  ],
  dailysphere: [
    { title: 'Morning Briefing', subtitle: 'Today\'s edition' }, { title: 'The Interview', subtitle: 'Long-form' },
    { title: 'Explained', subtitle: 'Deep dive' }, { title: 'Opinion', subtitle: 'Perspectives' },
    { title: 'Weekend Review', subtitle: 'Editors picks' }, { title: 'Photo Essay', subtitle: 'Visual story' },
    { title: 'The Global View', subtitle: 'International' }, { title: 'Daily Podcast', subtitle: 'Listen now' }
  ],
  creatorspace: [
    { title: 'Creator Dashboard', subtitle: 'Your analytics' }, { title: 'Video Uploads', subtitle: 'Published content' },
    { title: 'Audience Growth', subtitle: 'Last 28 days' }, { title: 'Brand Deals', subtitle: 'Opportunities' },
    { title: 'Live Studio', subtitle: 'Go live' }, { title: 'Community Posts', subtitle: 'Engage fans' },
    { title: 'Shorts', subtitle: 'Quick content' }, { title: 'Monetization', subtitle: 'Creator tools' }
  ],
  contenthub: [
    { title: 'The Daily Newsletter', subtitle: 'Independent writer' }, { title: 'Product Thinking', subtitle: 'Top publication' },
    { title: 'Personal Essays', subtitle: 'New this week' }, { title: 'Tech Dispatch', subtitle: 'Subscriber favorite' },
    { title: 'Culture Notes', subtitle: 'Editors picks' }, { title: 'The Long Read', subtitle: 'Featured story' },
    { title: 'Creator Notes', subtitle: 'Behind the scenes' }, { title: 'Member Archive', subtitle: 'Explore more' }
  ],
  careerconnect: [
    { title: 'Product Designer', subtitle: 'Recommended job' }, { title: 'Frontend Developer', subtitle: '12 new openings' },
    { title: 'Your Network', subtitle: 'People to connect with' }, { title: 'Microsoft', subtitle: 'Company spotlight' },
    { title: 'Career Advice', subtitle: 'Popular article' }, { title: 'Remote Work', subtitle: 'Trending topic' },
    { title: 'Learning Paths', subtitle: 'Build your skills' }, { title: 'Hiring Now', subtitle: 'Featured companies' }
  ],
  worksphere: [
    { title: 'Software Engineer', subtitle: 'Urgently hiring' }, { title: 'Data Analyst', subtitle: 'Remote opportunity' },
    { title: 'Project Manager', subtitle: 'Top match' }, { title: 'Resume Builder', subtitle: 'Career tools' },
    { title: 'Salary Guide', subtitle: 'Research your role' }, { title: 'Company Reviews', subtitle: 'See what employees say' },
    { title: 'Interview Prep', subtitle: 'Get ready' }, { title: 'Job Alerts', subtitle: 'Set your preferences' }
  ]
};

/**
 * Stands in for the real Content/Product/Post APIs that arrive in later phases
 * (OTT, Shopping, Social, Music, ...). Generates deterministic placeholder items
 * so the Section Renderer has something to render today without a real content
 * source. Deterministic (no Math.random) so the same section always renders the
 * same items, which keeps demos and tests stable.
 */
@Injectable({ providedIn: 'root' })
export class PlaceholderContentService {
  itemsForSection(section: SectionConfig, platformId: string): MediaItem[] {
    const label = section.title ?? 'Featured';
    const musicItems = MUSIC_ITEMS[platformId];
    const platformItems = PLATFORM_ITEMS[platformId];

    return Array.from({ length: ITEMS_PER_SECTION }, (_, i) => {
      const index = i + 1;
      const musicItem = musicItems?.[i];
      const platformItem = platformItems?.[i];
      return {
        id: `${platformId}-${section.type}-${section.order}-${index}`,
        title: musicItem?.title ?? platformItem?.title ?? `${label} ${index}`,
        subtitle: musicItem?.artist ?? platformItem?.subtitle ?? platformId,
        rating: Math.round((3 + ((index * 7) % 20) / 10) * 10) / 10,
        accentIndex: index % 6
      };
    });
  }
}
