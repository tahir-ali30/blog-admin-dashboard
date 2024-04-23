// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
// import useJwt from '@src/auth/jwt/useJwt'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { useSelector } from 'react-redux'

const ImageUpload = () => {
  // ** States
  const [data, setData] = useState(null),
    [featuredImg, setFeaturedImg] = useState(null),
    [isSubmitting, setIsSubmitting] = useState(false)

  const onChange = e => {
      const file = e.target.files?.[0]
      setFeaturedImg(file)
      //   console.log(file);
    // const reader = new FileReader(),
    // setImgPath(files[0].name)
    // reader.onload = function () {
    // }
    // reader.readAsDataURL(files[0])
  }

    async function handleSubmit(e){
      e.preventDefault()

      setIsSubmitting(true)
      const { message } = (await axios.post('/api/v1/images', { image: featuredImg }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}`
        }
      })).data;
      setIsSubmitting(false)
      alert(message);
    }

  return (
    <div className='blog-edit-wrapper'>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Image</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          <img
                            className='rounded me-2 mb-1 mb-md-0'
                            src={featuredImg ? URL.createObjectURL(featuredImg) : ''}
                            alt='Image'
                            width='170'
                            height='110'
                          />
                          <div>
                            <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>

                            {/* <p className='my-50'>
                              <a href='/' onClick={e => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p> */}
                            <div className='d-inline-block'>
                              <div className='mb-0'>
                                <Input
                                  type='file'
                                  id='exampleCustomFileBrowser'
                                  name='customFile'
                                  onChange={onChange}
                                  accept='.jpg, .png, .gif'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className='mt-50'>
                      <Button onClick={handleSubmit} color='primary' className='me-1' disabled={isSubmitting}>
                        {isSubmitting ? 'Uploading Image' : 'Upload Image'}
                      </Button>
                      <Button color='secondary' outline>
                        Cancel
                      </Button>
                    </Col>
    </div>
  )
}

export default ImageUpload
