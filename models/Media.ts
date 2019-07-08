interface File {
  url: string;
  details: {
    size: number;
    image: { width: number; height: number };
  };
  fileName: string;
  contentType: string;
}

export interface Media {
  id: string;
  title: string;
  description?: string;
  file: File;
}
