import React, { PureComponent } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
// import './BasePage.scss';

export default class BasePage extends PureComponent {
    state = {};

    static defaultProps = {};

    static propTypes = {
      children: PropTypes.node,
    };

    render() {
      const { children, title } = this.props;
      return (
        <>
          <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="BasePage">{children}</div>
        </>
      )
    }
}
