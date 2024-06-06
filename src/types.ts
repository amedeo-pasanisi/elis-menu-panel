export interface MenuPanelOptions {
  fetchUrl: string;
  tags: string
}

export interface MenuPanelDashboard { 
  id: number;
  uid: string;
  title: string;
  uri: string;
  url: string;
  slug: string;
  type: string;
  tags?: any[] | null;
  isStarred: boolean;
  folderId: number;
  folderUid: string;
  folderTitle: string;
  folderUrl: string;
  sortMeta: number;
}
