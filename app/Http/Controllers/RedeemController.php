$get_transaction_id = Transaction::where('ticket_id', $request->token)->pluck('id')->first();
                    RedeemHistory::create([
                        "user_id" => Auth::user()->id,
                        "transaction_id" => $get_transaction_id,
                        "amount" => $request->redeemed_amount,
                        "latitude" => $request->latitude,
                        "longitude" => $request->longitude,
                    ]);