/*
 * @providesModule connect
 */

'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';

import CenteredBox from 'components/CenteredBox';
import "components/ball-beat.css";

import { toPairs, fromPairs, zip, find } from 'lodash';

const LoadingPage = (props) => (
  <CenteredBox>
    <div className="la-ball-beat la-2x">
      <div />
      <div />
      <div />
    </div>
  </CenteredBox>
)

export default function connect(dataMapToProps) {

  function transform(Component) {

    class TransformedComponent extends React.Component {

      constructor(props, context) {
        super(props, context);
        this.state = {
          loading: true,
          loadedProps: []
        }
      }

      componentDidMount() {
        this.setState({
          loading: true,
          loadedProps: []
        })
        this.loadData();
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          loading: true,
          loadedProps: []
        });
        this.loadData();
      }

      async loadData() {
        // Get mapping of component properties to deferred
        // load promises before rendering the component
        let dataPairs = toPairs(dataMapToProps);

        // Wait for all the data promises to resolve
        let dataKeys = dataPairs.map(([x, y]) => (x));
        // Actually call the deferred functions here
        let dataPromises = dataPairs.map(([x, y]) => (y(this.props)));

        try {
          let dataValues = await Promise.all(dataPromises);
          // Put the properties back together
          let loadedPairs = zip(dataKeys, dataValues);
          let loadedProps = fromPairs(loadedPairs);

          this.setState({
            loading: false,
            loadedProps
          });
        }
        catch (e) {
          if (e.type == 'PermissionDenied') {
            if (TransformedComponent.requireLogin) {
              let next = '/login?next=' + encodeURIComponent(window.location.pathname);
              browserHistory.push(next);
            } else {
              this.setState({
                loading: false,
                loadedProps: {}
              });
            }
          } else {
            throw e;
          }
        }


      }

      render() {
        if (this.state.loading) {
          if (Component.loadingLayout) {
            return (
              <Component.loadingLayout>
                <LoadingPage />
              </Component.loadingLayout>
            );
          } else {
            return (
              <LoadingPage />
            );
          }
        } else {
          return (
            <Component
              {...this.props}
              {...this.state.loadedProps}
            />
          );
        }
      }
    }
    // Make sure that this value is passed regardless of the ordering of the
    // decorators on top of the class
    if (Component.requireLogin) {
      TransformedComponent.requireLogin = Component.requireLogin;
    }
    return TransformedComponent;
  }
  return transform;
}