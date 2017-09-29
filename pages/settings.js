import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Tooltip, DatePicker } from 'antd';
import inject from '../lib/inject';
import Page from '../components/Page';

const Settings = ({ dropbox }) => (
  <Page>
    <style jsx>{`
      div {
        // color: green;
      }
    `}</style>
    <div className="ant-table ant-table-middle">
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th>Dropbox</th>
                <th />
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Key</td>
                <td>
                  <Input
                    style={{ border: 0 }}
                    value={dropbox.key}
                    onChange={event => console.log(event)}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Path</td>
                <td>Actions</td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Sync</td>
                <td><DatePicker /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Page>
);

Settings.propTypes = {
  dropbox: PropTypes.object.isRequired,
};

export default inject(connect(
  state => ({ dropbox: state.settings.dropbox }),
  {}, // { saveSettings, signOut, syncFiles },
)(Settings));
