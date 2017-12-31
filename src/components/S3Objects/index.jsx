import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import S3Object from '../../components/S3Object';

class S3Objects extends PureComponent {
  render() {
    const classUl = 'something';
    const listS3Objects = this.props.s3items.map(item =>
      <S3Object key={item.sourceKey} params={item} />);
    return (
      <ul className={classUl}>
        {listS3Objects}
      </ul>
    );
  }
}

S3Objects.propTypes = {
  s3items: PropTypes.arrayOf(PropTypes.shape({
    blocked: PropTypes.bool,
    created_at: PropTypes.string,
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    last_ip: PropTypes.string,
    last_login: PropTypes.string,
    last_password_reset: PropTypes.string,
    logins_count: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  })),
};

S3Objects.defaultProps = {
  s3items: [],
};

export default S3Objects;
