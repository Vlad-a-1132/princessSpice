import React from 'react'

export default function Modal({open, onClose, content, title}) {

    return (
        <div class="modal" id="globalFooterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{display: open ? "block" : "none"}}>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{title}</h5>
                        <button onClick={onClose} style={{color: "black"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span style={{color: "black"}} aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}
