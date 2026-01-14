import * as Icons from "@tabler/icons-react";
import type { IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type IconListType={
    value: string;
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export const IconsList: IconListType[] = [
  // Core social
  { value: "fb", label: "Facebook", icon: Icons.IconBrandFacebook },
  { value: "insta", label: "Instagram", icon: Icons.IconBrandInstagram },
  { value: "yt", label: "YouTube", icon: Icons.IconBrandYoutube },
  { value: "tiktok", label: "TikTok", icon: Icons.IconBrandTiktok },
  { value: "x", label: "X (Twitter)", icon: Icons.IconBrandX },
  { value: "linkedin", label: "LinkedIn", icon: Icons.IconBrandLinkedin },

  // Messaging
  { value: "discord", label: "Discord", icon: Icons.IconBrandDiscord },

  // Design / dev
  { value: "github", label: "GitHub", icon: Icons.IconBrandGithub },
  { value: "onlyfans", label: "OnlyFans", icon: Icons.IconBrandOnlyfans },
  // Platforms
  { value: "google", label: "Google", icon: Icons.IconBrandGoogle },
  { value: "apple", label: "Apple", icon: Icons.IconBrandApple },
];

export const IconDetails=(value:string):IconListType | null=>{
    const list=IconsList.filter((t)=>{
        if(t.value==value){
            return true
        }
    })
    return list.length>0 ? list[0] : null
}