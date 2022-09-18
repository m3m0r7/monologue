import React, { PropsWithChildren } from "react";
import * as dialogStyle from "@/components/Dialog/dialog.module.scss";

type Props = {
  isOpened: boolean,
  title: string,
  type?: 'alert' | 'info' | 'success' | 'message',
  actionType?: 'ok' | 'close'
  onCancel?: () => void,
  onOk?: () => void,
  onClose?: () => void,
}

const Dialog: React.FC<PropsWithChildren<Props>> = ({ isOpened, title, children, type = 'message', actionType = 'close', onCancel, onOk, onClose }) => {
  const close = () => {
    if (onClose) {
      onClose();
    }
  }

  const cancel = () => {
    if (onCancel) {
      onCancel();
    }
    close();
  }

  const ok = () => {
    if (onOk) {
      onOk();
    }
    close();
  }

  return <div className={`${dialogStyle.dialogInOverlay} ${isOpened ? '' : 'hidden'}`}>
    <div className={`${dialogStyle.dialogContents} ${type !== 'message' ? dialogStyle[type] : ''}`}>
      <h2>{title}</h2>
      <div className={dialogStyle.dialogBody}>
        <div className={dialogStyle.dialogIconInBody}>
          {type === 'alert' && <i className="fa-solid fa-triangle-exclamation"></i>}
          {type === 'info' && <i className="fa-solid fa-circle-info"></i>}
          {type === 'success' && <i className="fa-solid fa-check"></i>}
        </div>
        <div>{children}</div>
      </div>
      <div className={dialogStyle.actionButtons}>
        {actionType === 'ok' && <>
            <button type="button" className={dialogStyle.cancelButtonContainer} onClick={cancel}>
              <div className={dialogStyle.cancelButton}>
                <span>Cancel</span>
              </div>
            </button>
            <button type="button" className={dialogStyle.okButtonContainer} onClick={ok}>
              <div className={dialogStyle.okButton}>
                <span>OK</span>
              </div>
            </button>
          </>
        }
        {actionType === 'close' &&
          <button type="button" className={dialogStyle.okButtonContainer} onClick={close}>
            <div className={dialogStyle.okButton}>
              <span>Close</span>
            </div>
          </button>
        }
      </div>
    </div>
  </div>
}

export default Dialog;
