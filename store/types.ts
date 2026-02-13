
export type styles= {
    userName: string;
    primaryTextColor: string | null;
    primaryBackground: string | null;
    desktopBackgroundColor: string | null;
    profilePictureShadow: number | null;
    profilePictureBorder: number | null;
    socialIconSize: number | null;
    cardColor: string | null;
    cardTextColor: string | null;
    cardCorner: number | null;
    cardBorder: number | null;
    cardBorderColor: string | null;
    cardShadow: number | null;
    cardSpacing: number | null;
  }


  export type header= {
    userName:string,
    name: string | null;
    bio: string | null;
    picURL: string | null;
  }

  export type icon={
    id:string;
    type:string;
    url:string|null;
    order:number
  }

  export type block={
      id:string,
      title:string | null,
      url:string | null,
      type:string,
      order:number
  }

export type GeneralType=Pick<styles,
    "userName"|
    "primaryTextColor"|
    "primaryBackground"|
    "desktopBackgroundColor">

export type HeaderType=Pick<styles,
    "userName"|
    "profilePictureShadow"|
    "profilePictureBorder"|
    "socialIconSize">

export type CardType=Pick<styles,
    "userName"|
    "cardColor"|
    "cardTextColor"|
    "cardCorner"|
    "cardBorder"|
    "cardBorderColor"|
    "cardShadow"|
    "cardSpacing">
