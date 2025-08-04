export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
    url?: string;
    image?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'player' | 'app';
    title?: string;
    description?: string; 
    image?: string;
  };
} 