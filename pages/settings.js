import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Tooltip } from 'antd';
import moment from 'moment';
import inject from '../lib/inject';
import Page from '../components/Page';
import { settingsUpdate, settingsCloudDelete } from '../actions/settings';
import { filesSync } from '../actions/files';
import { cloudSave } from '../actions/cloud';

const Settings = ({
  settingsUpdate,
  settingsCloudDelete,
  filesSync,
  cloudSave,
  cloud,
}) => (
  <Page>
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
                    placeholder="ABCD1234"
                    style={{ border: 0 }}
                    value={cloud.key}
                    onChange={({ target: { value } }) =>
                      settingsUpdate({ cloud: { key: value } })}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Path</td>
                <td>
                  <Input
                    placeholder="iTunes/iTunes Music"
                    style={{ border: 0 }}
                    value={cloud.path}
                    onChange={({ target: { value } }) =>
                      settingsUpdate({ cloud: { path: value } })}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Actions</td>
                <td>
                  <Tooltip placement="top" title="Delete">
                    <Button
                      type="primary"
                      shape="circle"
                      icon="delete"
                      style={{ marginLeft: 10 }}
                      onClick={() => settingsCloudDelete()}
                    />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={
                      cloud.status === 'syncing' ? 'Syncing' : 'Start sync'
                    }
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon="retweet"
                      style={{ marginLeft: 10 }}
                      loading={cloud.status === 'syncing'}
                      onClick={() => filesSync()}
                    />
                  </Tooltip>
                  {cloud.status === 'syncing' ? (
                    <Tooltip placement="top" title="Cancel sync">
                      <Button
                        type="danger"
                        shape="circle"
                        icon="close"
                        style={{ marginLeft: 10 }}
                        onChange={() => settingsUpdate({ status: 'cancelled' })}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      placement="top"
                      title={
                        cloud.date
                          ? `Synced ${moment(cloud.date).fromNow()}`
                          : 'Never synced'
                      }
                    >
                      <Button
                        type={cloud.status === 'success' ? 'default' : 'danger'}
                        shape="circle"
                        icon={
                          cloud.status === 'success' ? 'check' : 'exclamation'
                        }
                        style={{ marginLeft: 10 }}
                      />
                    </Tooltip>
                  )}
                  {cloud.key &&
                    cloud.path && (
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
  cloud: PropTypes.object.isRequired,
  settingsUpdate: PropTypes.func.isRequired,
  settingsCloudDelete: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSave: PropTypes.func.isRequired,
};

export default inject(
  connect(
    state => ({ cloud: state.settings.cloud }),
    dispatch => ({
      settingsUpdate: settings => dispatch(settingsUpdate(settings)),
      settingsCloudDelete: () => dispatch(settingsCloudDelete()),
      filesSync: () => dispatch(filesSync()),
      cloudSave: () => dispatch(cloudSave()),
    }),
  )(Settings),
);
