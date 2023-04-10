import { useState, useEffect } from 'react';
import { Upload, Button, Form } from 'antd';
import { axios_02 } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { useSelector } from "react-redux";

const LocalStorage = () => {

    const getBase64 = useGetBase64();
    const [file, setFile] = useState(null);

    const user = useSelector(function (state) {
        return state?.user;
    });

    const handleUpload = async (data) => setFile(data.file);
    const handlePreview = ({ fileList }) => setFile({ ...file, fileList });
    const handleChange = async (data) => {
        if (!data.file.url && !data.file.preview) {
            data.file.preview = await getBase64.init(data.file.originFileObj);
        }

        setFile({
            ...file,
            file: data.file
        });
    };

    useEffect(() => {
        axios_02
            .get(`/api/storage/${user.course.id}/local`)
            .then((response) => {
                console.log(response);
            })
            .catch(() => {
                console.log('error');
            });
    }, [user.course.id]);

    // const formData = new FormData();

    // formData.append("title", modal.data.title);
    // formData.append("content", modal.data.content);
    // file?.file?.originFileObj && formData.append("media", file?.file?.originFileObj);
    // !modal.data.id && formData.append("courseId", user.course.id);

    // axios_02
    //     .post(`/api/storage`, formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     }).then((response) => {
    //         console.log(response);
    //     })


    // const handleUpload = async (data) => setFile(data.file);
    // const handlePreview = ({ fileList }) => setFile({ ...file, fileList });
    // const handleChange = async (data) => {
    //     if (!data.file.url && !data.file.preview) {
    //         data.file.preview = await getBase64.init(data.file.originFileObj);
    //     }

    //     setFile({
    //         ...file,
    //         file: data.file,
    //     });
    // };

    return (
        <Form>
            <Form.Item>
                <Upload
                    name="media"
                    listType="picture-card"
                    className="media-uploader"
                    beforeUpload={getBase64.beforeUpload}
                    customRequest={handleUpload}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    fileList={file?.fileList || []}
                    maxCount={1}
                >
                    {file ? (
                        <img
                            src={file?.file?.preview}
                            alt="media"
                            style={{ width: "100%", height: '100%', borderRadius: '6px' }}
                        />
                    ) : file?.fileList?.length >= 1 ? null : (
                        "+ Upload"
                    )}
                </Upload>
            </Form.Item>
        </Form>
    );
}

export default LocalStorage;