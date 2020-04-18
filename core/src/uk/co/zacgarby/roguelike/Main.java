package uk.co.zacgarby.roguelike;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input.Keys;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShaderProgram;
import com.badlogic.gdx.math.Vector2;

import uk.co.zacgarby.roguelike.world.Generator;
import uk.co.zacgarby.roguelike.world.Level;


public class Main extends ApplicationAdapter {
	public static Player player;
	public static Level level;
	public static int camX, camY;
	public Pixmap lightMap;
	
	public SpriteBatch batch;
	public SpriteBatch lightbatch;
	//public ShaderProgram shader;
	
	@Override
	public void create () {		
		//ShaderProgram.pedantic = false;
		final String FRAGMENT = Gdx.files.internal("shaders/shadow.frag").readString();
		final String VERTEX = Gdx.files.internal("shaders/shadow.vert").readString();
		ShaderProgram shader = new ShaderProgram(VERTEX, FRAGMENT);

		
		if (!shader.isCompiled()) {
			System.err.println(shader.getLog());
			System.exit(0);
		}
		if (shader.getLog().length()!=0)
			System.out.println(shader.getLog());
		
		lightbatch = new SpriteBatch(8191);
		batch = new SpriteBatch(8191, shader);
		batch.setShader(shader);
		
		player = new Player("møøse");
		
		Generator gen = new Generator(500, 400, 400);
		System.out.println("Generating...");
		level = gen.generate();
		System.out.println("generated!");
		camX = 2000;
		camY = 2000;
		
		batch.setProjectionMatrix(batch.getProjectionMatrix().scale(4, 4, 1));
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		

		update();
		ShaderProgram shader = batch.getShader();
		
		
		//System.out.println(shader.getFragmentShaderSource());
		//shader.begin();
		//shader.setUniformf("resolution", new Vector2(screenSizeX(), screenSizeY()));
		//shader.end();
		
		shader.begin();
		shader.setUniformf("u_resolution", new Vector2(screenSizeX(), screenSizeY()));
		shader.end();


		
		batch.begin();
		level.draw(batch, camX, camY);
		Sidebar.draw(batch);
		batch.end();
	}
	
	public float screenSizeX() {
		return Gdx.graphics.getWidth()  - Sidebar.background.getWidth()*4;
	}
	public float screenSizeY() {
		return Gdx.graphics.getHeight();
	}
	
	private void update() {
		if (Gdx.input.isKeyPressed(Keys.LEFT)) {
			camX -= 3;
		}
		if (Gdx.input.isKeyPressed(Keys.RIGHT)) {
			camX += 3;
		}
		if (Gdx.input.isKeyPressed(Keys.UP)) {
			camY += 3;
		}
		if (Gdx.input.isKeyPressed(Keys.DOWN)) {
			camY -= 3;
		}
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		Sidebar.dispose();
	}
}
