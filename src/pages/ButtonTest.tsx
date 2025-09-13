import Button from '../components/Button';
import { Fragment } from 'react';

const ButtonTestPage = () => {
  return (
    <Fragment>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="primary"
              onClick={() => alert('클릭했습니다')}
            >
              테스트
            </Button>
            <Button size="default" variant="primary">
              테스트
            </Button>
            <Button size="small" variant="primary">
              테스트
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="primary"
              onClick={() => alert('클릭했습니다')}
              disabled
            >
              테스트
            </Button>
            <Button size="default" variant="primary" disabled>
              테스트
            </Button>
            <Button size="small" variant="primary" disabled>
              테스트
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="secondary"
              onClick={() => alert('클릭했습니다')}
            >
              테스트
            </Button>
            <Button size="default" variant="secondary">
              테스트
            </Button>
            <Button size="small" variant="secondary">
              테스트
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="secondary"
              onClick={() => alert('클릭했습니다')}
              disabled
            >
              테스트
            </Button>
            <Button size="default" variant="secondary" disabled>
              테스트
            </Button>
            <Button size="small" variant="secondary" disabled>
              테스트
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="success"
              onClick={() => alert('클릭했습니다')}
            >
              테스트
            </Button>
            <Button size="default" variant="success">
              테스트
            </Button>
            <Button size="small" variant="success">
              테스트
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="success"
              onClick={() => alert('클릭했습니다')}
              disabled
            >
              테스트
            </Button>
            <Button size="default" variant="success" disabled>
              테스트
            </Button>
            <Button size="small" variant="success" disabled>
              테스트
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="warning"
              onClick={() => alert('클릭했습니다')}
            >
              테스트
            </Button>
            <Button size="default" variant="warning">
              테스트
            </Button>
            <Button size="small" variant="warning">
              테스트
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="warning"
              onClick={() => alert('클릭했습니다')}
              disabled
            >
              테스트
            </Button>
            <Button size="default" variant="warning" disabled>
              테스트
            </Button>
            <Button size="small" variant="warning" disabled>
              테스트
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="danger"
              onClick={() => alert('클릭했습니다')}
            >
              테스트
            </Button>
            <Button size="default" variant="danger">
              테스트
            </Button>
            <Button size="small" variant="danger">
              테스트
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              variant="danger"
              onClick={() => alert('클릭했습니다')}
              disabled
            >
              테스트
            </Button>
            <Button size="default" variant="danger" disabled>
              테스트
            </Button>
            <Button size="small" variant="danger" disabled>
              테스트
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ButtonTestPage;
