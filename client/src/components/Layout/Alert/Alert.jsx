import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineCheck, AiOutlineWarning } from 'react-icons/ai';
import { VscError } from 'react-icons/vsc';
import { removeAlert } from '../../../store/actions/alert';

// styles
import './alert.css';
// components
import Colors from '../../../utils/Constants';

const Alert = ({ alerts, removeAlert }) => {
    const removeAlertHandler = (id) => {
        removeAlert(id);
    };

    return alerts !== null &&
        alerts.length > 0 && (
            <div id="alertStyles_root">
                {
                    alerts.map(alert => (
                        <div key={alert.id} className={`alert`} style={{ backgroundColor: Colors.alertBg }}>
                            <div className={`alertStyles_iconWrap`}>
                                {alert.alertType === 'success' && <AiOutlineCheck className="black-text iconText" />}
                                {alert.alertType === 'error' && <VscError className="black-text iconText" />}
                                {alert.alertType === 'warning' && <AiOutlineWarning className="black-text iconText" />}
                            </div>
                            <div className="alertStyles_bodyWrap">
                                <div className="alertStyles_msgWrap">
                                    <a href="#!" className="alertStyles_alertMsg" style={{ color: Colors.alertText }}>
                                        {alert.msg}
                                    </a>
                                </div>
                                <a onClick={() => { removeAlertHandler(alert.id) }} style={{ color: Colors.alertText }} href="#!" className="alertStyles_closeAlert" data-dismiss="alert" aria-hidden="true">x</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert);