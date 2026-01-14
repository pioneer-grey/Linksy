import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconProps
} from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type IconListType={
    value: string;
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export const IconsList = [
  { value: "fb", label: "Facebook", icon: IconBrandFacebook },
  { value: "yt", label: "Youtube", icon: IconBrandYoutube },
  { value: "tiktok", label: "Tiktok", icon: IconBrandTiktok },
  { value: "insta", label: "Instagram", icon: IconBrandInstagram },
];

export const IconDetails=(value:string):IconListType | null=>{
    const list=IconsList.filter((t)=>{
        if(t.value==value){
            return true
        }
    })
    return list.length>0 ? list[0] : null
}