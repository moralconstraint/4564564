// Update the cart item display to use initials instead of image:

<div className="flex items-center gap-4">
  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-background/50">
    <span className="text-sm font-medium">
      {item.name.substring(0, 2).toUpperCase()}
    </span>
  </div>
  <div>
    <h3 className="font-medium text-white">{item.name}</h3>
    <p className="text-sm text-white/60">
      ${item.price}
    </p>
  </div>
</div>