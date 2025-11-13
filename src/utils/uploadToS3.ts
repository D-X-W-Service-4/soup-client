import axiosInstance from '../apis/axiosInstance';

export async function uploadImageToS3_GET(base64: string, filename: string) {
  try {
    // 1) base64 → Blob 변환
    const res = await fetch(base64);
    const blob = await res.blob();

    const contentType = blob.type || 'image/png';

    console.log(`contentType: ${contentType}`);

    // 2) presigned-url GET 요청
    const presigned = await axiosInstance.get('/v1/files/presigned-url', {
      params: {
        fileName: filename,
        contentType: contentType,
      },
    });

    const presignedUrl = presigned.data.data.presignedUrl;
    console.log(`presignedUrl: ${presignedUrl}`);
    if (!presignedUrl) throw new Error('presignedUrl 없음');

    // 3) presigned URL 로 S3 업로드 (PUT)
    const uploadRes = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: blob,
    });

    if (!uploadRes.ok) {
      console.error('S3 업로드 실패:', uploadRes.status);
      throw new Error('S3 업로드 실패');
    }

    // 4) S3에 업로드된 최종 URL (쿼리 제거)
    const finalUrl = presignedUrl.split('?')[0];
    return finalUrl;
  } catch (err) {
    console.error('uploadImageToS3_GET 에러:', err);
    return null;
  }
}
