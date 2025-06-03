// components/Icons.tsx
import React from "react";
import {IoCloseSharp} from "react-icons/io5";
import {LogoIconTextNone} from "@/components/ui/icons/logo-text-none";
import {LogoIcon} from "@/components/ui/icons/logo-text";
import {IconHome} from "@/components/ui/icons/icon-home";
import {IconExit} from "@/components/ui/icons/icon-exit";
import {IconList} from "@/components/ui/icons/icon-list";
import {IconSetting} from "@/components/ui/icons/icon-setting";
import {IconChat} from "@/components/ui/icons/icon-chat";
import { IoNotifications } from "react-icons/io5";
import {AiStars} from "@/components/ui/icons/icon-ai-stars";
import {FaCalendar} from "react-icons/fa";
import {ChatAIStars} from "@/components/ui/icons/icon-ai-chat-stars";
import {ChatUser} from "@/components/ui/icons/icon-chat-user";
import {IconChatTop} from "@/components/ui/icons/icon-chat-top";
import {IconSend} from "@/components/ui/icons/icon-send";
import { IoLogIn } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import {FiHome} from "react-icons/fi";
import {RiChatAiLine} from "react-icons/ri";
import {CiViewList} from "react-icons/ci";


type IconComponent = React.FC<{ className?: string }>;

interface Props {
    name: string;
    className?: string;
}

export const IconSelect: React.FC<Props> = ({name, className = ""}) => {
    let DynamicComponent: IconComponent;

    switch (name) {
        case "close":
            DynamicComponent = IoCloseSharp;
            break;
        case "logo":
            DynamicComponent = LogoIconTextNone;
            break;
        case "login":
            DynamicComponent = IoLogIn;
            break;
        case "chat-ai":
            DynamicComponent = ChatAIStars;
            break;
        case "AC":
            DynamicComponent = FaCalendar;
            break;
        case "chat-top":
            DynamicComponent = IconChatTop;
            break;
        case "send":
            DynamicComponent = IconSend;
            break;
        case "avatar":
            DynamicComponent = ChatUser;
            break;
        case "notification":
            DynamicComponent = IoNotifications;
            break;
        case "ai":
            DynamicComponent = AiStars;
            break;
        case "logo-text":
            DynamicComponent = LogoIcon;
            break;
        case "home":
            DynamicComponent = FiHome ;
            break;
        case "chat":
            DynamicComponent = RiChatAiLine;
            break;
        case "exit":
            DynamicComponent = IconExit;
            break;
        case "list":
            DynamicComponent = CiViewList;
            break;
        case "setting":
            DynamicComponent = IoSettingsOutline;
            break;
        default:
            DynamicComponent = IoCloseSharp;
    }

    return <DynamicComponent className={className}/>;
};
