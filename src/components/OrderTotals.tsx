import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[]
    tip: number
    placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    const subTotalAmout = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])
    const tipAmount = useMemo(() => subTotalAmout * tip, [tip, order])
    const totalAmount = useMemo(() => tipAmount + subTotalAmout, [tip, order])

    return (
        <>

            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                <p>Subtotal a pagar:
                    <span className="font-bold"> {formatCurrency(subTotalAmout)}</span>
                </p>

                <p>Propina:
                    <span className="font-bold"> {formatCurrency(tipAmount)}</span>
                </p>

                <p>Total a pagar:
                    <span className="font-bold"> {formatCurrency(totalAmount)}</span>
                </p>
            </div>

            <button
                className="w-full bg-black uppercase text-white font-bold mt-10 p-3 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={placeOrder}
            >
                Guardar orden
            </button>

        </>
    )
}
