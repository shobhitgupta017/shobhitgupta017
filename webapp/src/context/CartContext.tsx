"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProduct } from "@/data/products";
import type { Product } from "@/data/products";

export type CartLine = {
  /** `${productId}::${unit}` so different pack sizes are separate lines. */
  key: string;
  productId: string;
  unit: string;
  price: number;
  quantity: number;
};

export type CartLineWithProduct = CartLine & { product: Product };

type CartContextValue = {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  isReady: boolean;
  addItem: (product: Product, options?: { unit?: string; price?: number; quantity?: number }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  quantityOf: (productId: string, unit?: string) => number;
};

const CART_KEY = "mmgs.cart";
const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, unit: string): string {
  return `${productId}::${unit}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      // Ignore corrupted cart data and start fresh.
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, isReady]);

  const addItem = useCallback<CartContextValue["addItem"]>((product, options) => {
    const unit = options?.unit ?? product.unit;
    const price = options?.price ?? product.price;
    const quantity = options?.quantity ?? 1;
    const key = lineKey(product.id, unit);

    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing)
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      return [...current, { key, productId: product.id, unit, price, quantity }];
    });
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>((key, quantity) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.key !== key)
        : current.map((line) => (line.key === key ? { ...line, quantity } : line)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const linesWithProduct = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProduct(line.productId);
          return product ? { ...line, product } : null;
        })
        .filter((line): line is CartLineWithProduct => line !== null),
    [lines],
  );

  const quantityOf = useCallback<CartContextValue["quantityOf"]>(
    (productId, unit) => {
      if (unit) return lines.find((line) => line.key === lineKey(productId, unit))?.quantity ?? 0;
      return lines
        .filter((line) => line.productId === productId)
        .reduce((total, line) => total + line.quantity, 0);
    },
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: linesWithProduct,
      itemCount: linesWithProduct.reduce((total, line) => total + line.quantity, 0),
      subtotal: linesWithProduct.reduce((total, line) => total + line.price * line.quantity, 0),
      isReady,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      quantityOf,
    }),
    [linesWithProduct, isReady, addItem, updateQuantity, removeItem, clearCart, quantityOf],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
