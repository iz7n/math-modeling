<h2>Assumptions</h2>

<ul>
  <li>
    <p>All of the shapes in the physics simulation will be convex.</p>
    <i>
      This is the most important assumption because, as I will later go in to,
      the Separating Axis Theorem requires that both shapes are convex to
      accurately determine whether or not a collision has occured.
    </i>
  </li>
  <li>
    <p>
      1,000 random objects will be enough where the randomness won't matter.
    </p>
    <i
      >Since in my testing I randomize the objects, the large amount of objects
      should make it so the difference in times for each method of optimization
      will be solely based on is efficiency and not some sort of randomness.</i
    >
  </li>
</ul>
