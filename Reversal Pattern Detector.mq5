//+------------------------------------------------------------------+
//|                                    Reversal Pattern Detector.mq5 |
//|                             Copyright 2023, @coinx - coinx.trade |
//|                                              https://coinx.trade |
//+------------------------------------------------------------------+
//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int OnInit()
{
  //--- indicator buffers mapping
  
  //---
  return (INIT_SUCCEEDED);
}
//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
{
  //---

  //--- return value of prev_calculated for next call
  return (rates_total);
}
//+------------------------------------------------------------------+

// Khai báo lớp
class ReversalPatternDetector
{
public:
  // Hàm nhận diện mô hình nến Pin Bar
  bool IsPinBar(double open, double close, double high, double low)
  {
    double body = MathAbs(close - open);
    double upper_shadow = high - MathMax(close, open);
    double lower_shadow = MathMin(close, open) - low;

    if (upper_shadow >= 2 * body && lower_shadow <= 0.5 * body)
    {
      return true; // Nến là Pin Bar
    }

    return false;
  }

  bool IsDragonflyDoji(double open, double close, double high, double low)
  {
    double body = MathAbs(close - open);
    double upper_shadow = high - MathMax(close, open);
    double lower_shadow = MathMin(close, open) - low;

    if (upper_shadow < body * 0.1 && lower_shadow >= body * 2.0)
    {
      return true; // Nến là Dragonfly Doji
    }

    return false;
  }
};
