<h2>Analysis</h2>

<div class="strong-weak">
  <h3>Strengths</h3>
  <h3>Weaknesses</h3>
  <ul>
    <li>
      I don't think I have to say this, but, it's very interactive and awesome.
      Just look at the top of the paper.
    </li>
    <li>
      I like how visual this paper is. I feel that this attribute makes
      understanding the Separating Axis Theorem abstractly much easier.
    </li>
  </ul>
  <ul>
    <li>
      The tested data is strongly tied to the division size and capacity, but
      either way the naive approach would still come far behind the Spatial Hash
      Grid and Quadtree.
    </li>
    <li>
      Since there is a lot that goes into this paper. There are some parts that
      are left a bit vague, like putting the Separating Axis Theorem together.
    </li>
  </ul>
</div>

<h3>Future Use</h3>

<p>
  The Separating Axis Theorem is not the only way to detect collisions between
  polygons. There is also the Gilbert-Johnson-Keerthi algorithm which may be
  faster than the Separating Axis Theorem, but more complicated. More that could
  be added is some comparisons in the speed of the Gilbert-Johnson-Keerthi
  algorithm vs. that of the Separating Axis Theorem.
</p>

<p>
  If I had more time to make this paper, I would like to go more in-depth into
  the Separating Axis Theorem as a whole, bringing together the ideas discussed
  to contruct the full algorithm. I would also like to maybe go into some of the
  physics when resolving the collisions.
</p>

<style lang="scss">
  .strong-weak {
    display: grid;
    grid-template: auto 1fr / 1fr 1fr;
  }
  h3 {
    text-align: center;
  }
</style>
