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
import { asyncHandler, titleFormat } from '../../../../utility/Utils'

const ImageGallery = () => {
  // ** States
  const [data, setData] = useState(null)

  useEffect(() => {
    asyncHandler(axios.get)('/api/v1/images')
      .then(res => res.data)
      .then(images => setData(images))
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
      return (
        <Col key={item._id} md='6'>
          <Card>
            <CardImg className='img-fluid' src={item.url} alt={item._id} top onClick={() => navigator.clipboard.writeText(item.url)
              .then(() => alert('Copied url to clipboard'))} />
            {/* <Link to={`/pages/category/detail/${item.name}`}>
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/pages/category/detail/${item.name}`}>
                  {titleFormat(item.name)}
                </Link>
              </CardTitle>
              <div className='my-1 py-25'>{renderTags()}</div>
              <div className='mt-1 pt-25'>Description:</div>
              <div className='my-1 py-20'>{item.description}</div>
              <CardText className='blog-content-truncate'>{item.excerpt}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className='text-body me-50' />
                  <span className='text-body fw-bold'>{item.comment} Comments</span>
                </Link>
                <Link className='fw-bold' to={`/pages/blog/detail/${item._id}`}>
                  Read More
                </Link>
              </div>
            </CardBody> */}
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs title='Image Gallery' data={[{ title: 'Pages' }, { title: 'Image' }, { title: 'Gallery' }]} />
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

export default ImageGallery
