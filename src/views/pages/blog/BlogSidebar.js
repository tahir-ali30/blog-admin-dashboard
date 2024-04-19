// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from 'reactstrap'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'

const BlogSidebar = () => {
  // ** States
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/api/v1/blogs')
      .then(res => res.data.data)
      .then(blogs => setData(blogs))
  }, [])

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }

  // const renderRecentPosts = () => {
  //   return data.recentPosts.map((post, index) => {
  //     return (
  //       <div
  //         key={index}
  //         className={classnames('d-flex', {
  //           'mb-2': index !== data.recentPosts.length - 1
  //         })}
  //       >
  //         <Link className='me-2' to={`/pages/blog/detail/${post.id}`}>
  //           <img className='rounded' src={post.img} alt={post.title} width='100' height='70' />
  //         </Link>
  //         <div>
  //           <h6 className='blog-recent-post-title'>
  //             <Link className='text-body-heading' to={`/pages/blog/detail/${post.id}`}>
  //               {post.title}
  //             </Link>
  //           </h6>
  //           <div className='text-muted mb-0'>{post.createdTime}</div>
  //         </div>
  //       </div>
  //     )
  //   })
  // }
  const renderBlogs = () => {
    return data.map((blog, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex', {
            'mb-2': index !== data.length - 1
          })}
        >
          <Link className='me-2' to={`/pages/blog/detail/${blog._id}`}>
            <img className='rounded' src={blog.featured_img} alt={blog.title} width='100' height='70' />
          </Link>
          <div>
            <h6 className='blog-recent-post-title'>
              <Link className='text-body-heading' to={`/pages/blog/detail/${blog._id}`}>
                {blog.title}
              </Link>
            </h6>
            <div className='text-muted mb-0'>{new Date(blog.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      )
    })
  }

  const renderCategories = () => {
    return data.categories.map((item, index) => {
      const IconTag = Icon[item.icon]

      return (
        <div
          key={index}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mb-75': index !== data.categories.length - 1
          })}
        >
          <a className='me-75' href='/' onClick={e => e.preventDefault()}>
            <Avatar className='rounded' color={CategoryColorsArr[item.category]} icon={<IconTag size={15} />} />
          </a>
          <a href='/' onClick={e => e.preventDefault()}>
            <div className='blog-category-title text-body'>{item.category}</div>
          </a>
        </div>
      )
    })
  }

  async function handleSearchBlogPosts(e) {
    if (e.key === 'Enter') {
      const { data: blogs } = (await axios.get(`http://localhost:3005/api/v1/blogs/search?title=${e.target.value}`)).data;
      setData(blogs);
    }
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' onKeyDown={handleSearchBlogPosts} />
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            {data !== null ? (
              <Fragment>
                <div className='blog-recent-posts mt-3'>
                  <h6 className='section-label'>Recent Posts</h6>
                  <div className='mt-75'>{renderBlogs()}</div>
                </div>
                {/* <div className='blog-categories mt-3'>
                  <h6 className='section-label'>Categories</h6>
                  <div className='mt-1'>{renderCategories()}</div>
                </div> */}
              </Fragment>
            ) : <ComponentSpinner />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
