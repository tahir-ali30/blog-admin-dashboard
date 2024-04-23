// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import { MessageSquare } from 'react-feather'

// ** Custom Components
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { titleFormat } from '../../../../utility/Utils'

const CategoryList = () => {
  // ** States
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/api/v1/category')
      .then(res => res.data.data)
      .then(categories => setData(categories))
  }, [])

  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const renderRenderList = () => {
    return data.map(item => {
      // const renderTags = () => {
      //   return item.tags.map((tag, index) => {
      //     return (
      //       <a key={index} href='/' onClick={e => e.preventDefault()}>
      //         <Badge
      //           className={classnames({
      //             'me-50': index !== item.tags.length - 1
      //           })}
      //           color={badgeColorsArr[tag]}
      //           pill
      //         >
      //           {tag}
      //         </Badge>
      //       </a>
      //     )
      //   })
      // }

      return (
        <Col key={item.name} md='6'>
          <Card>
            <Link to={`/pages/category/detail/${item.name}`}>
              <CardImg className='img-fluid' src={item.category_img} alt={item.name} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/pages/category/detail/${item.name}`}>
                  {titleFormat(item.name)}
                </Link>
              </CardTitle>
              {/* <div className='d-flex'>
                <Avatar className='me-50' img={item?.author?.avatar_img} imgHeight='24' imgWidth='24' />
                <div>
                  <small className='text-muted me-25'>by</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                      {item?.author?.fullName}
                    </a>
                  </small>
                  <span className='text-muted ms-50 me-25'>|</span>
                  <small className='text-muted'>{item.blogPosted}</small>
                </div>
              </div> */}
              {/* <div className='my-1 py-25'>{renderTags()}</div> */}
              <div className='mt-1 pt-25'>Description:</div>
              <div className='my-1 py-20'>{item.description}</div>
              {/* <CardText className='blog-content-truncate'>{item.excerpt}</CardText> */}
              {/* <hr /> */}
              <div className='d-flex justify-content-between align-items-center'>
                {/* <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className='text-body me-50' />
                  <span className='text-body fw-bold'>{item.comment} Comments</span>
                </Link> */}
                {/* <Link className='fw-bold' to={`/pages/blog/detail/${item._id}`}>
                  Read More
                </Link> */}
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs title='Category List' data={[{ title: 'Pages' }, { title: 'Category' }, { title: 'List' }]} />
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                <Row>
                  <Col sm='12'>
                    <Pagination className='d-flex justify-content-center mt-2'>
                      <PaginationItem className='prev-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem >
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          4
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          5
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          6
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          7
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className='next-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </div>
            ) : <ComponentSpinner />}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  )
}

export default CategoryList