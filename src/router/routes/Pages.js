import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import CategoryAdd from '../../views/pages/category/add'
import CategoryList from '../../views/pages/category/list'
import CategoryDetails from '../../views/pages/category/details'
import CategoryEdit from '../../views/pages/category/edit'
import ImageUpload from '../../views/pages/images/upload'
import ImageGallery from '../../views/pages/images/gallery'

const Faq = lazy(() => import('../../views/pages/faq'))
const ApiKey = lazy(() => import('../../views/pages/api-key'))
const Profile = lazy(() => import('../../views/pages/profile'))
const Pricing = lazy(() => import('../../views/pages/pricing'))
const License = lazy(() => import('../../views/pages/license'))
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
const KnowledgeBase = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
const KnowledgeBaseCategory = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory'))
const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))

const PagesRoutes = [
  {
    path: '/pages/profile',
    element: <Profile />
  },
  {
    path: '/pages/faq',
    element: <Faq />
  },
  {
    path: '/pages/knowledge-base',
    element: <KnowledgeBase />
  },
  {
    path: '/pages/knowledge-base/:category',
    element: <KnowledgeBaseCategory />
  },
  {
    path: '/pages/knowledge-base/:category/:question',
    element: <KBCategoryQuestion />
  },
  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/pages/license',
    element: <License />
  },
  {
    path: '/pages/api-key',
    element: <ApiKey />
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
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/6621074331d83d1c212fb36b' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/6621074331d83d1c212fb36b' />
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
    path: '/pages/category/detail',
    element: <Navigate to='/pages/category/detail/6623a4f2ca56b9cee90a792f' />
  },
  {
    path: '/pages/category/edit/:name',
    element: <CategoryEdit />
  },
  {
    path: '/pages/category/edit',
    element: <Navigate to='/pages/category/edit/6623a4f2ca56b9cee90a792f' />
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
    path: '/pages/pricing',
    element: <Pricing />
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
