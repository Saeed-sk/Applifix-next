// components/Icons.tsx
import React from "react";
import {IoCloseSharp} from "react-icons/io5";
import {AiOutlineCopyright} from "react-icons/ai";
import {SiAparat} from "react-icons/si";
import {BsInstagram} from "react-icons/bs";
import {ImWhatsapp} from "react-icons/im";
import {BiLogoTelegram} from "react-icons/bi";
import {LiaFacebookF} from "react-icons/lia";
import {IoLogoTwitter} from "react-icons/io5";
import {FaAngleRight, FaLinkedinIn} from "react-icons/fa6";
import {FaYoutube} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {IoDocumentTextOutline} from "react-icons/io5";
import {SlMenu} from "react-icons/sl";
import {IoSearchOutline} from "react-icons/io5";
import {FaChevronDown} from "react-icons/fa6";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {CiCircleChevRight} from "react-icons/ci";
import {CiCircleChevLeft} from "react-icons/ci";
import {CiCalendar} from "react-icons/ci";
import {IconBed} from "@/components/ui/icons/icon-bed";
import {IconLogoDrak} from "@/components/ui/icons/icon-logo-drak";
import {IconLogoLight} from "@/components/ui/icons/icon-logo-light";
import {BgTicket} from "@/components/ui/icons/bg-ticket";
import {IconGroupUser} from "@/components/ui/icons/icon-group-user";
import {IconTour} from "@/components/ui/icons/icon-tour";
import {CiCircleChevDown} from "react-icons/ci";
import {CiCircleChevUp} from "react-icons/ci";
import {SlShare} from "react-icons/sl";
import {CiClock1} from "react-icons/ci";
import {IoBookmark} from "react-icons/io5";
import {IoBookmarkOutline} from "react-icons/io5";
import {MdLocalPhone} from "react-icons/md";
import {TbMailFilled} from "react-icons/tb";
import {FaLocationDot} from "react-icons/fa6";
import {GoHeartFill} from "react-icons/go";
import {IoIosHeartEmpty} from "react-icons/io";
import {IconTick} from "@/components/ui/icons/icon-tick";
import {IconPlane} from "@/components/ui/icons/icon-plane";
import {IconFlag} from "@/components/ui/icons/icon-flag";
import {IconSecurity} from "@/components/ui/icons/icon-security";
import { FaAngleLeft } from "react-icons/fa6";
import {IconContactLocation} from "@/components/ui/icons/icon-contact-location";
import {IconContactCall} from "@/components/ui/icons/icon-contact-call";


type IconComponent = React.FC<{ className?: string }>;

interface Props {
    name: string;
    classes?: string;
}

export const IconSelect: React.FC<Props> = ({name, classes = ""}) => {
    let DynamicComponent: IconComponent;

    switch (name) {
        case "close-outline":
            DynamicComponent = IoIosCloseCircleOutline;
            break;
        case "close":
            DynamicComponent = IoCloseSharp;
            break;
        case "flag":
            DynamicComponent = IconFlag;
            break;
        case "security":
            DynamicComponent = IconSecurity;
            break;
        case 'copyright':
            DynamicComponent = AiOutlineCopyright;
            break;
        case 'heart-fill':
            DynamicComponent = GoHeartFill;
            break;
        case 'check-tick':
            DynamicComponent = IconTick;
            break;
        case 'heart-outline':
            DynamicComponent = IoIosHeartEmpty;
            break;
        case 'contact-location':
            DynamicComponent = IconContactLocation;
            break;
        case 'contact-call':
            DynamicComponent = IconContactCall;
            break;
        case 'aparat':
            DynamicComponent = SiAparat;
            break;
        case 'instagram':
            DynamicComponent = BsInstagram;
            break;
        case 'whatsapp':
            DynamicComponent = ImWhatsapp;
            break;
        case 'telegram':
            DynamicComponent = BiLogoTelegram;
            break;
        case 'facebook':
            DynamicComponent = LiaFacebookF;
            break;
        case 'twitter':
            DynamicComponent = IoLogoTwitter;
            break;
        case 'linkedin':
            DynamicComponent = FaLinkedinIn;
            break;
        case 'youtube':
            DynamicComponent = FaYoutube;
            break;
        case 'profile':
            DynamicComponent = CgProfile;
            break;
        case 'document':
            DynamicComponent = IoDocumentTextOutline;
            break;
        case 'menu':
            DynamicComponent = SlMenu;
            break;
        case 'search':
            DynamicComponent = IoSearchOutline;
            break;
        case 'down':
            DynamicComponent = FaChevronDown;
            break;
        case 'slider-right':
            DynamicComponent = FaAngleRight ;
            break;
        case 'slider-left':
            DynamicComponent = FaAngleLeft;
            break;
        case 'slider-down':
            DynamicComponent = CiCircleChevDown;
            break;
        case 'slider-up':
            DynamicComponent = CiCircleChevUp;
            break;
        case 'clock':
            DynamicComponent = CiClock1;
            break;
        case 'bookmark':
            DynamicComponent = IoBookmark;
            break;
        case 'bookmarkOutLine':
            DynamicComponent = IoBookmarkOutline;
            break;
        case 'share':
            DynamicComponent = SlShare;
            break;
        case 'hotel':
            DynamicComponent = IconBed;
            break;
        case 'logo-dark':
            DynamicComponent = IconLogoDrak;
            break;
        case 'logo-light':
            DynamicComponent = IconLogoLight;
            break;
        case 'ticket':
            DynamicComponent = BgTicket;
            break;
        case 'users':
            DynamicComponent = IconGroupUser;
            break;
        case 'tour':
            DynamicComponent = IconTour;
            break;
        case 'plane':
            DynamicComponent = IconPlane;
            break;
        case 'calendar':
            DynamicComponent = CiCalendar;
            break;
        case 'phone':
            DynamicComponent = MdLocalPhone;
            break;
        case 'mail':
            DynamicComponent = TbMailFilled;
            break;
        case 'location':
            DynamicComponent = FaLocationDot;
            break;
        default:
            DynamicComponent = IoCloseSharp;
    }

    return <DynamicComponent className={classes}/>;
};
