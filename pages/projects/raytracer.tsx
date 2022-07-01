const RayTracerPage = () => {
    return (
        <div class="container-fluid">
            <h4>Project 3: Ray Tracer</h4>
            name: <i>Ben Allan-rahill</i>
            <center>
                <canvas width="600" height="400" id="canvas-raytracer"></canvas>
                <br />
                <select id="select-background" onchange="setBackground();">
                    <option value="daylight">daylight</option>
                    <option value="white">white</option>
                </select>
                <select id="select-checkpoint" onchange="runCheckpoint();">
                    <option value="1">checkpoint1</option>
                    <option value="2">checkpoint2</option>
                    <option value="3">checkpoint3</option>
                    <option value="4">checkpoint4</option>
                    <option value="5">my scene</option>
                    <option value="6">truck</option>
                </select>
                <label for="spp">SPP </label>
                <input
                    id="spp"
                    type="number"
                    min="1"
                    max="32"
                    onchange="setSPP()"
                />
                <br />
            </center>
            <h4>Description</h4>
            <i>
                Describe your ray tracer here. This will include a discussion of
                any research you did to implement the features you chose. For
                example, how did you compute the background color from an image?
                How did you texture your objects? How did you calculate the
                intersection point for more complicated shapes?
            </i>
            <p>
                In my ray tracer, I attempted to implement BVH. To do this, I
                followed Peter Shirley's 'Ray Tracing: The Next Week' and
                translating his C++ code into my Javascript implementation. The
                BVH implementation works by calculating a bounding box for every
                object in the scene. In the checkpoint examples, the objects
                would be the spheres and with a triangle mesh, the objects are
                the individual triangles. These objects are the leaves of the
                bounding volume hierachy. To construct the entire hierachy, we
                compose each bounding box into higher-order bounding boxes. This
                constructs a tree like structure that can be used to traverse
                the objects in the scene much more quickly than our class
                implementation.{' '}
            </p>
            <h4>Results</h4>
            <i>
                Describe the scenes you set up and include sample images your
                ray tracer generates for these scenes. You must include images
                that demonstrate the ability of your ray tracer to render images
                similar to the "checkpoint" images. You should also include any
                images your ray tracer produces for the features you added.
            </i>
            <p>
                I set up the basic scenes described in the checkpoints. On top
                of that, I rendered a glass-fox, and a diffuse Tesla cybertruck
                (using BVH).{' '}
            </p>
            <ul>
                <li>
                    <h4>Checkpoint 1</h4>
                    <img src="checkpoints/checkpoint1.png" width="300" />
                    <p>
                        This scene is a very basic sphere with no material. With
                        no material, no shading is done so all that is returned
                        for each pixel is the background or the base color of
                        the sphere.
                    </p>
                </li>
                <li>
                    <h4>Checkpoint 2</h4>
                    <img width="300" src="checkpoints/checkpoint2.png" />
                    <p>
                        In this scene we iterate over multiple obects to render
                        multiple spheres. For this scene we need to make sure
                        that we are checking our t parameter value to make sure
                        that it is within our <i>tmin</i> and <i>tmax</i>. We
                        also need to make sure that we are returning the closest
                        intersection point.{' '}
                    </p>
                </li>
                <li>
                    <h4>Checkpoint 3</h4>
                    <img src="checkpoints/checkpoint3.png" width="300" />
                    <p>
                        In the third checkpoint, we added the Phong shading
                        model. This uses the intersection point, the outward
                        normal, and the direction to the light to calculate the
                        diffuse and specular components of the color. This is
                        then added to the ambient color that is returned by
                        default. This Phong shading occurs only if there is
                        nothing between the intersection point and the light. If
                        there is an object blocking the ligtht, then we just
                        return the ambient color. This gives us shadows.
                    </p>{' '}
                </li>
                <li>
                    <h4>Checkpoint 4</h4>
                    <img src="checkpoints/checkpoint4.png" width="300" />
                    <p>
                        {' '}
                        In the final checkpoint, we added reflective and
                        refractive materials. This implements recursive
                        ray-tracing to determine what color should be rendered
                        by a reflected or refracted ray.{' '}
                    </p>{' '}
                </li>
                <li>
                    <h4>My Scene</h4>
                    <img src="checkpoints/cybertruck.png" width="300" />
                    <p>
                        {' '}
                        For my scene, I implemented BVH to render a cybertruck
                        with 10K triangles. The photo above is the truck at
                        1ssp, so there are a lot of jaggies.
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default RayTracerPage
