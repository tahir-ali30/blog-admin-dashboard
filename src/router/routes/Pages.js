import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const CategoryAdd = lazy(() => import('../../views/pages/category/add'))
const CategoryList = lazy(() => import('../../views/pages/category/list'))
const CategoryDetails = lazy(() => import('../../views/pages/category/details'))
const CategoryEdit = lazy(() => import('../../views/pages/category/edit'))
const ImageUpload = lazy(() => import('../../views/pages/images/upload'))
const ImageGallery = lazy(() => import('../../views/pages/images/gallery'))

// const Faq = lazy(() => import('../../views/pages/faq'))
// const ApiKey = lazy(() => import('../../views/pages/api-key'))
const Profile = lazy(() => import('../../views/pages/profile'))
// const Pricing = lazy(() => import('../../views/pages/pricing'))
// const License = lazy(() => import('../../views/pages/license'))
const Error = lazy(() => import('../../views/pages/misc/Error'))
const BlogAdd = lazy(() => import('../../views/pages/blog/add'))
const BlogList = lazy(() => import('../../views/pages/blog/list'))
const BlogEdit = lazy(() => import('../../views/pages/blog/edit'))
const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
const ModalExamples = lazy(() => import('../../views/pages/modal-examples'))
const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))
// const KnowledgeBase = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
// const KnowledgeBaseCategory = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory'))
// const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))

const PagesRoutes = [
  {
    path: '/pages/profile',
    element: <Profile />
  },
  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/pages/modal-examples',
    element: <ModalExamples />
  },
  {
    path: '/pages/blog/add',
    element: <BlogAdd />
  },
  {
    path: '/pages/blog/list',
    element: <BlogList />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <BlogDetails />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/category/add',
    element: <CategoryAdd />
  },
  {
    path: '/pages/category/list',
    element: <CategoryList />
  },
  {
    path: '/pages/category/detail/:name',
    element: <CategoryDetails />
  },
  {
    path: '/pages/category/edit/:name',
    element: <CategoryEdit />
  },
  {
    path: '/pages/image/upload',
    element: <ImageUpload />
  },
  {
    path: '/pages/image/gallery/',
    element: <ImageGallery />
  },
  {
    path: '/misc/coming-soon',
    element: <ComingSoon />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/not-authorized',
    element: <NotAuthorized />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/maintenance',
    element: <Maintenance />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/error',
    element: <Error />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  }
]

export default PagesRoutes
