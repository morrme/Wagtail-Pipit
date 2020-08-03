import React, { PureComponent } from 'react';
import { basePageWrap } from '../BasePage';
import PropTypes from 'prop-types';

class ArticlePage extends PureComponent {
  state = {};

  static defaultProps = {
    title: '',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <div className="ArticlePage">
        <h1 className="ArticlePage__Title">{title}</h1>
      </div>
    );
  }
}

export default basePageWrap(ArticlePage);
