import { useState, useEffect } from 'react';
import { translate } from '@i18n/index';

const LOADING_TEXT = 'LOADING...';
const DONE_TEXT = '';
const ANIMATION_DELAY = 400;

export default function useFormButton(text, loading, cb) {
    const [done, setDone] = useState(false);

    let caption = text;

    if (loading) {
        caption = LOADING_TEXT;
    }

    if (done) {
        caption = DONE_TEXT;
    }

    useEffect(() => {
        if (done) {
            setTimeout(cb, ANIMATION_DELAY);
        }
    }, [done]);

    const submitButtonProps = {
        caption: translate(caption),
        className: done ? 'btn-success btn-success-check-mark' : 'btn-gradient',
    };

    return { setDone, submitButtonProps };
}
