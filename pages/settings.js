import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Tooltip } from 'antd';
import moment from 'moment';
import { assocPath } from 'ramda';
import inject from '../lib/inject';
import Page from '../components/Page';
import {
  settingsUpdate,
  settingsDropboxDelete,
  settingsDropboxSync,
} from '../actions/settings';

const Settings = ({
  settingsUpdate,
  settingsDropboxDelete,
  settingsDropboxSync,
  dropbox,
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
                    value={dropbox.key}
                    onChange={({ target: { value } }) =>
                      settingsUpdate({
                        dropbox: assocPath(['key'], value, dropbox),
                      })}
                  />
                </td>
              </tr>
              <tr className="ant-table-row ant-table-row-level-0">
                <td>Path</td>
                <td>
                  <Input
                    placeholder="/iTunes/iTunes Music"
                    style={{ border: 0 }}
                    value={dropbox.path}
                    onChange={({ target: { value } }) =>
                      settingsUpdate({
                        dropbox: assocPath(['path'], value, dropbox),
                      })}
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
                      onClick={() => settingsDropboxDelete()}
                    />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={
                      dropbox.sync.status === 'syncing'
                        ? 'Syncing'
                        : 'Start sync'
                    }
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon="retweet"
                      style={{ marginLeft: 10 }}
                      loading={dropbox.sync.status === 'syncing'}
                      onClick={() => {
                        settingsUpdate({
                          dropbox: assocPath(
                            ['sync'],
                            { date: Date.now(), status: 'syncing' },
                            dropbox,
                          ),
                        });
                        settingsDropboxSync();
                      }}
                    />
                  </Tooltip>
                  {dropbox.sync.status === 'syncing' ? (
                    <Tooltip placement="top" title="Cancel sync">
                      <Button
                        type="danger"
                        shape="circle"
                        icon="close"
                        style={{ marginLeft: 10 }}
                        onClick={() => this.stopSync()}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      placement="top"
                      title={
                        dropbox.sync.date
                          ? moment().from(dropbox.sync.date)
                          : 'Never synced'
                      }
                    >
                      <Button
                        type={
                          dropbox.sync.status === 'success'
                            ? 'default'
                            : 'danger'
                        }
                        shape="circle"
                        icon={
                          dropbox.sync.status === 'success'
                            ? 'check'
                            : 'exclamation'
                        }
                        style={{ marginLeft: 10 }}
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
  dropbox: PropTypes.object.isRequired,
  settingsUpdate: PropTypes.func.isRequired,
  settingsDropboxDelete: PropTypes.func.isRequired,
  settingsDropboxSync: PropTypes.func.isRequired,
};

export default inject(
  connect(
    state => ({ dropbox: state.settings.dropbox }),
    dispatch => ({
      settingsUpdate: settings => dispatch(settingsUpdate(settings)),
      settingsDropboxDelete: () => dispatch(settingsDropboxDelete()),
      settingsDropboxSync: () => dispatch(settingsDropboxSync()),
    }),
  )(Settings),
);
