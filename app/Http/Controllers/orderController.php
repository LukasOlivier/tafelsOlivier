<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Order;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class orderController extends Controller
{
    function getStock()
    {
        return ["data" => Stock::all()];
    }

    function getOrders()
    {
        return ["data" => Order::all()];
    }

    function getMessages()
    {
        return ["data" => Message::all()];
    }

    function placeOrder(Request $request)
    {
        $rules = $this->buildRules();

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            Log::warning("Validator input error");
            return response()->json(["errors" => $validator->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $data = $validator->validated();

            $booking = $this->buildBooking($data);
            $booking->save();
            return $booking;
        }
    }

    function buildRules()
    {
        return ["name" => "required|string|max:20",
            "number" => "required|string|max:50",
            "amount" => "required|integer|max:20",
            "from" => "required|date|after:today",
            "till" => "required|date|after:today",
            "comment" => "",
            "price" => "required|integer",
        ];
    }

    function buildBooking($data)
    {
        $booking = new Order();
        $booking->name = $data["name"];
        $booking->number = $data["number"];
        $booking->amount = $data["amount"];
        $booking->from = $data["from"];
        $booking->till = $data["till"];
        $booking->comment = $data["comment"];
        $booking->price = $data["price"];
        $booking->save();
        return $booking;
    }

    function newMessage(Request $request)
    {
        $rules = $this->buildMessageRules();

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            Log::warning("Validator input error");
            return response()->json(["errors" => $validator->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $data = $validator->validated();

            $message = $this->buildMessage($data);
            $message->save();
            return $message;
        }
    }
    function buildMessageRules()
    {
        return ["firstname" => "required|string|max:10",
            "lastname" => "required|string|max:10",
            "mail" => "required|string|max:100",
            "phone" => "required|string|max:100",
            "message" => "required|string|max:100",
        ];
    }

    function buildMessage($data)
    {
        $message = new Message();
        $message->firstname = $data["firstname"];
        $message->lastname = $data["lastname"];
        $message->mail = $data["mail"];
        $message->phone = $data["phone"];
        $message->message = $data["message"];
        $message->save();
        return $message;
    }
}
