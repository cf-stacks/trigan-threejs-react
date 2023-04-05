import {
  IconArticle,
  IconClipboardText,
  IconFiles,
  IconLanguage,
  IconList,
  IconMail,
  IconUser,
  IconUsers,
  IconTriangle,
  IconUserPlus,
  IconArrowSharpTurnRight,
  IconSchema,
  IconBrandLinkedin,
  IconBriefcase,
  TablerIcon,
} from '@tabler/icons'

export interface NavLinkItem {
  icon: TablerIcon,
  url: string
  label?: string
  links?: NavLinkItem[]
}

export const navLinks: NavLinkItem[] = [
  {
    icon: IconUser,
    url: 'admin',
    links: [
      { url: 'mailinglist', icon: IconMail },
      { url: 'managelanguages', icon: IconLanguage },
      { url: 'document-changes', icon: IconFiles },
      { url: 'teammembers-proposals', icon: IconUsers },
    ],
  },
  { icon: IconUserPlus, url: 'users', label: "Users" },
  { icon: IconArticle, url: 'posts', label: "Posts" },
  { icon: IconSchema, url: 'posts-proposal' },
  { icon: IconArrowSharpTurnRight, url: 'milestones' },
  { icon: IconUsers, url: 'teammembers' },
  { icon: IconFiles, url: 'documents' },
  { icon: IconClipboardText, url: 'proposals' },
  { icon: IconList, url: 'content' },
  { icon: IconTriangle, url: 'ABtesting' },
  { icon: IconBrandLinkedin, url: 'linkedinaccounts' },
  { icon: IconBriefcase, url: 'linkedinjobs' },
  { icon: IconFiles, url: 'linkedinapplicants' },
]
