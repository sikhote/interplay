import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import moment from 'moment';
import { lensPath, set } from 'ramda';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import { filesSync } from '../actions/files';
import { cloudSave } from '../actions/cloud';

const Settings = ({ settingsReplace, filesSync, cloudSave, settings }) => (
  <Page>
    <div className="ant-table ant-table-middle">
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th width={140} colSpan={2} style={{ textAlign: 'left' }}>
                  Dropbox
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Key</td>
                <td style={{ paddingLeft: 0 }}>
                  <Input
                    placeholder="ABCD1234"
                    style={{ border: 0 }}
                    value={settings.cloud.key}
                    onChange={({ target: { value } }) => {
                      window.localStorage.setItem('key', value);
                      settingsReplace(
                        set(lensPath(['cloud', 'key']), value, settings),
                      );
                    }}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Path</td>
                <td style={{ paddingLeft: 0 }}>
                  <Input
                    placeholder="iTunes/iTunes Music"
                    style={{ border: 0 }}
                    value={settings.cloud.path}
                    onChange={({ target: { value } }) => {
                      window.localStorage.setItem('path', value);
                      settingsReplace(
                        set(lensPath(['cloud', 'path']), value, settings),
                      );
                    }}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Actions</td>
                <td style={{ paddingLeft: 0 }}>
                  <Tooltip
                    style={{ marginLeft: 10 }}
                    placement="top"
                    title={
                      settings.cloud.status === 'syncing'
                        ? 'Syncing'
                        : 'Start sync'
                    }
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon="retweet"
                      style={{ marginLeft: 10 }}
                      loading={settings.cloud.status === 'syncing'}
                      onClick={() => filesSync()}
                    />
                  </Tooltip>
                  {settings.cloud.status === 'syncing' ? (
                    <Tooltip placement="top" title="Cancel sync">
                      <Button
                        type="danger"
                        shape="circle"
                        icon="close"
                        style={{ marginLeft: 10 }}
                        onChange={() =>
                          settingsReplace(
                            set(
                              lensPath(['cloud', 'status']),
                              'cancelled',
                              settings,
                            ),
                          )
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      placement="top"
                      title={
                        settings.cloud.date
                          ? `Synced ${moment(settings.cloud.date).fromNow()}`
                          : 'Never synced'
                      }
                    >
                      <Button
                        type={
                          settings.cloud.status === 'success'
                            ? 'default'
                            : 'danger'
                        }
                        shape="circle"
                        icon={
                          settings.cloud.status === 'success'
                            ? 'check'
                            : 'exclamation'
                        }
                        style={{ marginLeft: 10 }}
                      />
                    </Tooltip>
                  )}
                  {settings.cloud.key &&
                    settings.cloud.path && (
                      <Tooltip placement="top" title="Save state to cloud">
                        <Button
                          type="primary"
                          shape="circle"
                          icon="save"
                          style={{ marginLeft: 10 }}
                          onClick={() => cloudSave()}
                        />
                      </Tooltip>
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Page>
);

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSave: PropTypes.func.isRequired,
};

export default withRedux(
  initStore,
  state => ({ settings: state.settings }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
    filesSync: () => dispatch(filesSync()),
    cloudSave: () => dispatch(cloudSave()),
  }),
)(Settings);
