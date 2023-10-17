// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_e1993') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: "OANDA:XAUUSD",
                        timezone: "Asia/Ho_Chi_Minh",
                        theme: "dark",
                        style: "1",
                        locale: "en",
                        enable_publishing: true,
                        withdateranges: true,
                        range: "YTD",
                        hide_side_toolbar: false,
                        allow_symbol_change: true,
                        details: true,
                        hotlist: true,
                        calendar: true,
                        studies: ["STD;MA%Ribbon"],
                        show_popup_button: true,
                        popup_width: "1000",
                        popup_height: "1000",
                        container_id: "tradingview_e1993"
                    });
                }
            }
        },
        []
    );

    return (
        <div className='tradingview-widget-container' style={{ height: "900px", width: "100%" }}>
            <div id='tradingview_e1993' style={{ height: "100%", width: "100%" }} />

            <div className="tradingview-widget-copyright">
                <a href="https://coinx.trade/" rel="noopener nofollow" target="_blank"><span className="blue-text">Theo dõi thị trường</span></a>
            </div>
        </div>
    );
}